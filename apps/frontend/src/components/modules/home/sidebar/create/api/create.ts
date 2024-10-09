import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/utils/axios";

const createTextPost = async (text: string) => {
  try {
    await axios.post("/post/create/text", {
      text,
    });
  } catch {
    throw new Error("Something went wrong");
  }
};

export function useCreateTextPost() {
  return useMutation({
    mutationFn: createTextPost,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
