import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { NotificationsResponse } from "@/lib/store/notifications";
import { createClient } from "@/utils/supabase/client";

export const fetchNotifications = async (): Promise<
  NotificationsResponse[]
> => {
  const supabase = createClient();

  return (
    (
      await supabase
        .from("notifications")
        .select()
        .order("created_at", { ascending: false })
    ).data ?? []
  );
};

export function useGetNotifications() {
  return useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: fetchNotifications,
  });
}
