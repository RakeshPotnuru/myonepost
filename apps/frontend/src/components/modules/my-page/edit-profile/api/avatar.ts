import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/utils/api-client";

const updateAvatar = async (data: FormData): Promise<string> => {
  const res = await axios.post("/user/avatar", data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return res.data.avatarUrl as string;
};

export function useUpdateAvatar() {
  return useMutation({
    mutationFn: updateAvatar,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
