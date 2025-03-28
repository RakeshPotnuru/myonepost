import { useQuery } from "@tanstack/react-query";

import type { PageResponse } from "@/lib/store/page";
import { fetchClient } from "@/utils/api-client";
import { createClient } from "@/utils/supabase/client";

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

const fetchArchive = async (username: string) => {
  const client = createClient();

  const { data, error } = await client
    .from("archives")
    .select("*, users!inner(username)")
    .order("created_at", { ascending: false })
    .eq("users.username", username);

  if (error) {
    return null;
  }

  return data;
};

export function useGetArchive(username: string) {
  return useQuery({
    queryKey: [`@${username}-archive`],
    queryFn: () => fetchArchive(username),
  });
}
