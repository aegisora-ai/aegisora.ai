import { createClient } from "@/utils/supabase/server";


export async function revokeSession(
  sessionToken:string
){

  const supabase = await createClient();


  await supabase
    .from("revoked_sessions")
    .insert({
      session_token:sessionToken
    });

}



export async function isSessionRevoked(
  sessionToken:string
){

  const supabase = await createClient();


  const {
    data
  } = await supabase
    .from("revoked_sessions")
    .select("id")
    .eq(
      "session_token",
      sessionToken
    )
    .maybeSingle();


  return !!data;

}
