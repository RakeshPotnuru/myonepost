import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { MeResponse } from "@/lib/store/user";
import { fetchClient } from "@/utils/api-client";

const fetchMe = async (): Promise<MeResponse | null> => {
  return (await fetchClient.GET("/user/me"))
    .data as unknown as MeResponse | null;
};

export function useGetMe() {
  return useQuery({
    queryKey: [queryKeys.me],
    queryFn: fetchMe,
  });
}
