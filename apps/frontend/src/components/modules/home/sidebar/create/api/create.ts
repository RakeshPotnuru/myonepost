import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/utils/api-client";

const createImagePost = async (data: FormData) => {
  try {
    await axios.post("/post/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.trace(error);
    throw new Error("Something went wrong");
  }
};

export function useCreateImagePost() {
  return useMutation({
    mutationFn: createImagePost,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
