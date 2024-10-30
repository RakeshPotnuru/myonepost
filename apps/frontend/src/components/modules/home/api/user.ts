import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { User } from "@/lib/store/user";
import { fetchClient } from "@/utils/api-client";

const fetchMe = async (): Promise<User | null> => {
  return (await fetchClient.GET("/user/me")).data as unknown as User | null;
};

export function useGetMe() {
  return useQuery({
    queryKey: [queryKeys.getMe],
    queryFn: fetchMe,
  });
}
