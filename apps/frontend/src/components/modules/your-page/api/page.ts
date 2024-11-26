import { useQuery } from "@tanstack/react-query";

import type { PageResponse } from "@/lib/store/page";
import { fetchClient } from "@/utils/api-client";

const fetchPage = async (username: string): Promise<PageResponse> => {
  const response = await fetchClient.GET("/user/{username}", {
    params: {
      path: { username },
    },
  });

  return response.data as unknown as PageResponse;
};

export function useGetPage(username: string) {
  return useQuery({
    queryKey: [`@${username}`],
    queryFn: () => fetchPage(username),
  });
}
