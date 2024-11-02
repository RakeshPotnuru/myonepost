import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { MeResponse } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";

const fetchMe = async (): Promise<MeResponse | null> => {
  const supabase = createClient();
  const { data: me } = await supabase.auth.getUser();

  if (!me.user) return null;

  const { data } = await supabase
    .from("users")
    .select(
      `
      *,
      subscribed_to:subscribers!subscribers_user_id_fkey (
        subscribed_to_id
      ),
      likes:post_likes (
        post_id
      )
    `,
    )
    .eq("id", me.user?.id)
    .limit(1)
    .single();

  return data;
};

export function useGetMe() {
  return useQuery({
    queryKey: [queryKeys.me],
    queryFn: fetchMe,
  });
}
