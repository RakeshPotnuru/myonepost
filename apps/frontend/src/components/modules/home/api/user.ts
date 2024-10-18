import { useQuery } from "@tanstack/react-query";

import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const fetchCurrentUserProfile = async (): Promise<Tables<"Profile"> | null> => {
  const currentUserId = (await supabase.auth.getUser()).data.user?.id;

  if (!currentUserId) {
    return null;
  }

  // const { data } = await client
  //   .from("Profile")
  //   .select("*")
  //   .eq("id", currentUserId)
  //   .limit(1)
  //   .single();
  // const { data } = await fetchClient.GET("/user/me");

  return null;
};

export function useGetCurrentUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchCurrentUserProfile,
  });
}
