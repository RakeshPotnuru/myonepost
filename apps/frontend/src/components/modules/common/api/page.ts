import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

const client = createClient();

const fetchUserPost = async (username: string) => {
  const { data } = await client
    .from("users")
    .select(
      `
      *,
      Post(
        *
      )
    `,
    )
    .eq("username", username)
    .limit(1)
    .single();

  return data;
};

export function useGetUserPost(username: string) {
  return useQuery({
    queryKey: ["post", username],
    queryFn: () => fetchUserPost(username),
  });
}
