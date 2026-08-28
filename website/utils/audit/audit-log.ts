import { createClient } from "@/utils/supabase/server";


export async function writeAuditLog(
  action:string,
  metadata: unknown={}
){

  const supabase = await createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();


  if(!user){
    return;
  }


  await supabase
    .from("audit_logs")
    .insert({

      user_id:user.id,

      action,

      metadata

    });

}
