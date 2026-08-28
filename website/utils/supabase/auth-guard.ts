import { createClient } from "@/utils/supabase/server";
import { isSessionRevoked } from "@/utils/security/session-revocation";

async function getVerifiedSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return null;
  }

  const revoked = await isSessionRevoked(session.access_token);

  if (revoked) {
    return null;
  }

  return {
    supabase,
    user,
    session,
  };
}

export async function requireUser() {
  const verified = await getVerifiedSession();

  return verified?.user ?? null;
}

export async function requireAdmin() {
  const verified = await getVerifiedSession();

  if (!verified) {
    return null;
  }

  const { data: profile } = await verified.supabase
    .from("profiles")
    .select("role")
    .eq("id", verified.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return null;
  }

  return verified.user;
}
