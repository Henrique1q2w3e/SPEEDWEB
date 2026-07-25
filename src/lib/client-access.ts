import { createClient } from "@/lib/supabase/server";
import { SITE_CONFIG } from "@/lib/site-config";

export async function sendClientAccessLink(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${SITE_CONFIG.url}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  if (error) throw error;
}
