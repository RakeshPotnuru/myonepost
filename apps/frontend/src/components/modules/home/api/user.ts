import { useQuery } from "@tanstack/react-query";

// const supabase = createClient();

const fetchCurrentUserProfile = () => {
  // const currentUserId = (await supabase.auth.getUser()).data.user?.id;
  // if (!currentUserId) {
  //   return null;
  // }
  // const { data } = await client
  //   .from("users")
  //   .select("*")
  //   .eq("id", currentUserId)
  //   .limit(1)
  //   .single();
  // const { data } = await fetchClient.GET("/user/me");
  // return null;
};

export function useGetCurrentUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchCurrentUserProfile,
  });
}
