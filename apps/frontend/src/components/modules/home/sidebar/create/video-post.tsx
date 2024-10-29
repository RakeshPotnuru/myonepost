"use client";

import { memo, useCallback, useState } from "react";

import { CONSTANTS } from "@1post/shared";
import MuxPlayer from "@mux/mux-player-react/lazy";
import * as UpChunk from "@mux/upchunk";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import type { z } from "zod";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { Progress } from "@/components/ui/reusables/progress";
import { siteConfig } from "@/config/site";
import { queryClient } from "@/lib/providers/react-query";
import client from "@/utils/api-client";
import { mimeToExtensions } from "@/utils/mime-to-extensions";
import { shortenText } from "@/utils/text-shortener";

import type { CaptionFormSchema } from "./caption-form";
import CaptionForm, { useCaptionForm } from "./caption-form";
import CreateDialog from "./create-dialog";
import Dropzone from "./dropzone";

const MemoizedDropzoneContent = memo(
  ({
    file,
    progress,
    setFile,
    isDisabled,
  }: {
    file: File | undefined;
    progress: number;
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
        {progress > 0 && (
          <div className="flex w-full flex-row items-center">
            <Progress value={progress} />
            <p className="ml-2 text-sm font-medium text-muted-foreground">
              {progress === 100 ? "Processing..." : `${progress}%`}
            </p>
          </div>
        )}
      </div>
    ) : (
      <p className="text-muted-foreground">
        Drag & drop the video here or click to choose (60 seconds or less)
      </p>
    ),
);
MemoizedDropzoneContent.displayName = "DropzoneContent";

export default function CreateVideoPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync, isPending } = client.useMutation("post", "/post/video", {
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const { form, file, setFile } = useCaptionForm();

  const onSubmit = useCallback(
    async (values: z.infer<typeof CaptionFormSchema>) => {
      if (!file) return;

      setIsUploading(true);

      try {
        const response = (await mutateAsync({
          body: { mediaCaption: values.caption },
        })) as { url: string };

        const upload = UpChunk.createUpload({
          endpoint: response.url,
          file,
        });

        upload.on("error", (error) => {
          toast.error(error.detail as string);
        });

        upload.on("progress", (progress) => {
          setProgress(Math.round(progress.detail as number));
        });

        upload.on("success", async () => {
          toast.success(
            "Video uploaded successfully. You will be notified when posted.",
          );
          setIsOpen(false);
          setIsUploading(false);
          setFile(undefined);
          setProgress(0);
          form.reset({ caption: "" });
          await queryClient.invalidateQueries();
        });
      } catch {
        // ignore
      }
    },
    [file, form, mutateAsync, setFile],
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

  const isDisabled = isPending || form.formState.isSubmitting || isUploading;

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
          progress={progress}
          setFile={setFile}
          isDisabled={isDisabled}
        />
      </Dropzone>

      <CaptionForm isDisabled={isDisabled} />
    </CreateDialog>
  );
}
