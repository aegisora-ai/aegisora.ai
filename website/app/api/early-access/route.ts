import { NextResponse } from "next/server";
import { requireAdmin } from "@/utils/supabase/auth-guard";
import { writeAuditLog } from "@/utils/audit/audit-log";
import { rateLimit } from "@/utils/security/rate-limit";
import { revokeSession } from "@/utils/security/session-revocation";

interface EarlyAccessRequest {
  email:string;
  status:"pending"|"approved";
  date:string;
}

declare global {
  var _earlyAccessRequests: EarlyAccessRequest[] | undefined;
}

if(!global._earlyAccessRequests){
  global._earlyAccessRequests=[];
}

const requests=global._earlyAccessRequests;


export async function GET(request:Request){

  const ip =
    request.headers.get("x-forwarded-for") ??
    "unknown";


  if(!rateLimit(ip)){
    return NextResponse.json(
      {
        error:"Too many requests"
      },
      {
        status:429
      }
    );
  }

  try{

    const admin=await requireAdmin();

    if(!admin){
      return NextResponse.json(
        {error:"Unauthorized"},
        {status:401}
      );
    }


    const {searchParams}=new URL(request.url);

    const email=searchParams.get("email");


    if(email){

      const found=requests.find(
        r=>r.email===email
      );

      return NextResponse.json({
        exists:!!found,
        status:found?.status ?? "none"
      });

    }


    return NextResponse.json(requests);


  }catch(error){

    console.error(
      "Early Access GET Error:",
      error
    );

    return NextResponse.json(
      {error:"Server error"},
      {status:500}
    );
  }

}



export async function POST(request:Request){

  const ip =
    request.headers.get("x-forwarded-for") ??
    "unknown";


  if(!rateLimit(ip)){
    return NextResponse.json(
      {
        error:"Too many requests"
      },
      {
        status:429
      }
    );
  }

  try{


    const body=await request.json();

    const {
      email,
      action
    }=body;



    if(action==="approve"){

      const admin=await requireAdmin();


      if(!admin){

        return NextResponse.json(
          {error:"Unauthorized"},
          {status:401}
        );

      }


      const target=requests.find(
        r=>r.email===email
      );


      if(target){

        target.status="approved";

      }else{

        requests.push({
          email,
          status:"approved",
          date:new Date().toISOString()
        });

      }


      await writeAuditLog(
        "APPROVE_EARLY_ACCESS",
        {
          email,
          adminId: admin.id
        }
      );

      return NextResponse.json({
        success:true,
        requests
      });

    }



    if(!email || typeof email!=="string"){

      return NextResponse.json(
        {error:"Valid email required"},
        {status:400}
      );

    }



    const existing=requests.find(
      r=>r.email===email
    );


    if(!existing){

      requests.push({

        email,

        status:"pending",

        date:new Date().toISOString()

      });

    }



    return NextResponse.json({

      success:true,

      status:
        existing?.status ?? "pending"

    });



  }catch(error){

    console.error(
      "Early Access POST Error:",
      error
    );


    return NextResponse.json(
      {error:"Server error"},
      {status:500}
    );

  }

}

export async function DELETE(request: Request) {
  try {
    const supabase = await (await import("@/utils/supabase/server")).createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      return NextResponse.json(
        { error: "No active session" },
        { status: 401 }
      );
    }

    await revokeSession(session.access_token);
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
      revoked: true,
    });
  } catch (error) {
    console.error("Admin session revoke failed:", error);

    return NextResponse.json(
      { error: "Session revocation failed" },
      { status: 500 }
    );
  }
}
