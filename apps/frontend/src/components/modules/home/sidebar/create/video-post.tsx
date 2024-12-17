"use client";

import { memo, useCallback, useState } from "react";

import { CONSTANTS } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react/lazy";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { siteConfig } from "@/config/site";
import { queryClient, queryKeys } from "@/lib/providers/react-query";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";
import { mimeToExtensions } from "@/utils/mime-to-extensions";
import { shortenText } from "@/utils/text-shortener";

import CaptionForm, { CaptionFormSchema } from "./caption-form";
import CreateDialog from "./create-dialog";
import Dropzone from "./dropzone";

const MemoizedDropzoneContent = memo(
  ({
    file,
    setFile,
    isDisabled,
  }: {
    file: File | undefined;
    setFile: (file: File | undefined) => void;
    isDisabled: boolean;
  }) =>
    file ? (
      <div className="flex w-full flex-col items-center space-y-4">
        <MuxPlayer
          src={URL.createObjectURL(file)}
          accentColor={siteConfig.theme.color}
          className="aspect-video"
        />
        <div className="flex flex-row items-center">
          <p className="text-sm font-medium">{shortenText(file.name, 20)}</p>
          <Button
            onClick={() => setFile(undefined)}
            size="icon"
            variant="ghost"
            className="rounded-full"
            disabled={isDisabled}
          >
            <Icons.Close className="size-4" />
          </Button>
        </div>
      </div>
    ) : (
      <p className="text-muted-foreground">
        Drag & drop the video (mp4) here or click to choose (60 seconds or less)
      </p>
    ),
);
MemoizedDropzoneContent.displayName = "DropzoneContent";

export default function CreateVideoPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof CaptionFormSchema>>({
    resolver: zodResolver(CaptionFormSchema),
    mode: "onBlur",
    defaultValues: {
      caption: "",
    },
  });

  const { mutateAsync, isPending } = client.useMutation(
    "post",
    "/post/upload",
    {
      onError: () => {
        toast.error("Something went wrong. Please try again later.");
        setIsUploading(false);
      },
    },
  );

  const { mutateAsync: createPost, isPending: isPostPending } =
    client.useMutation("post", "/post/video", {
      onError: (error) => {
        console.log({ error });

        toast.error("Something went wrong. Please try again later.");
        setIsUploading(false);
      },
    });

  const { user } = useUserStore();

  const onSubmit = useCallback(
    async (values: z.infer<typeof CaptionFormSchema>) => {
      if (!file) return;

      try {
        setIsUploading(true);
        const response = (await mutateAsync({})) as unknown as { url: string };

        await axios.put(response.url, file, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        setIsUploading(false);

        await createPost({
          body: { mediaCaption: values.caption },
        });

        toast.success(
          "Submitted successfully. You will be notified when posted.",
        );
        setIsOpen(false);
        setFile(undefined);
        form.reset({ caption: "" });
        await queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
        await queryClient.invalidateQueries({
          queryKey: [`@${user?.username}`],
        });
        // });
      } catch {
        // ignore
      }
    },
    [file, form, mutateAsync, setFile, user?.username, createPost],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const video = document.createElement("video");
      video.preload = "metadata";

      const getDuration = new Promise<number>((resolve, reject) => {
        video.addEventListener("loadedmetadata", () => {
          window.URL.revokeObjectURL(video.src);
          resolve(video.duration);
        });
        video.addEventListener("onerror", () => {
          reject(new Error("Error loading video metadata"));
        });
      });

      video.src = URL.createObjectURL(file);

      getDuration
        .then((duration: number) => {
          if (duration > 60) {
            toast.error("Video duration must be 60 seconds or less");
            return;
          }
          setFile(file);
        })
        .catch(() => {
          toast.error("Error checking video duration");
        });
    },
    [setFile],
  );

  const isDisabled =
    isPending || form.formState.isSubmitting || isUploading || isPostPending;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: mimeToExtensions(CONSTANTS.POST.VIDEO_POST.ACCEPTED_MIME_TYPES),
    maxFiles: 1,
    disabled: isDisabled || !!file,
  });

  return (
    <CreateDialog
      icon={<Icons.VideoPost className="size-4" />}
      className="bg-chart-3"
      tooltip="Video Post"
      isLoading={isDisabled}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={form.handleSubmit(onSubmit)}
    >
      <Dropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
        isDragAccept={isDragAccept}
        file={file}
      >
        <MemoizedDropzoneContent
          file={file}
          setFile={setFile}
          isDisabled={isDisabled}
        />
      </Dropzone>

      <CaptionForm isDisabled={isDisabled} form={form} />
    </CreateDialog>
  );
}
