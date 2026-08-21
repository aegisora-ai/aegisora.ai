import { createClient } from "@/utils/supabase/server";

export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
