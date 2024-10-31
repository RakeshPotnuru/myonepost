import type { Notification } from "@1post/shared";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import { fetchClient } from "@/utils/api-client";

export const fetchNotifications = async (): Promise<Notification[]> => {
  return (await fetchClient.GET("/notification"))
    .data as unknown as Notification[];
};

export function useGetNotifications() {
  return useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: fetchNotifications,
  });
}
