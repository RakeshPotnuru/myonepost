import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/providers/react-query";
import type { MeResponse } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";

const fetchMe = async (): Promise<MeResponse | null> => {
  const supabase = createClient();

  return (await supabase.from("users").select().limit(1).single()).data;
};

export function useGetMe() {
  return useQuery({
    queryKey: [queryKeys.me],
    queryFn: fetchMe,
  });
}
