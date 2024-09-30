import { AuthPage } from "@/components/modules/auth";
import HomePage from "@/components/modules/home";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <HomePage /> : <AuthPage />;
}
