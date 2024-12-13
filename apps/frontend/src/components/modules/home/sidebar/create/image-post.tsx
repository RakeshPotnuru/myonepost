"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import { CONSTANTS } from "@1post/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Options } from "browser-image-compression";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { queryClient, queryKeys } from "@/lib/providers/react-query";
import useUserStore from "@/lib/store/user";
import { mimeToExtensions } from "@/utils/mime-to-extensions";
import { shortenText } from "@/utils/text-shortener";

import { useCreateImagePost } from "./api/create";
import CaptionForm, { CaptionFormSchema } from "./caption-form";
import CreateDialog from "./create-dialog";
import Dropzone from "./dropzone";

export default function CreateImagePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [file, setFile] = useState<File>();

  const { mutateAsync, isPending } = useCreateImagePost();

  const form = useForm<z.infer<typeof CaptionFormSchema>>({
    resolver: zodResolver(CaptionFormSchema),
    mode: "onBlur",
    defaultValues: {
      caption: "",
    },
  });

  const watchCaption = form.watch("caption", "");

  const { user } = useUserStore();

  const onSubmit = async (values: z.infer<typeof CaptionFormSchema>) => {
    if (!file) {
      return;
    }

    let compressedFile;
    try {
      setIsCompressing(true);
      const options: Options = {
        maxSizeMB: CONSTANTS.POST.IMAGE_POST.MAX_SIZE,
        useWebWorker: true,
        initialQuality: 0.8,
      };

      // Compress the image
      compressedFile = await imageCompression(file, options);
      // Double-check final size
      if (compressedFile.size > CONSTANTS.POST.IMAGE_POST.MAX_SIZE) {
        toast.error(
          `Your image size is too large. Max size is ${CONSTANTS.POST.IMAGE_POST.MAX_SIZE / (1024 * 1024)}MB`,
        );
        return;
      }
    } catch {
      toast.error("Failed to process image");
      return;
    } finally {
      setIsCompressing(false);
    }

    try {
      const data = new FormData();
      data.append("file", compressedFile);
      if (values.caption) data.append("mediaCaption", values.caption);

      await mutateAsync(data);

      toast.success(
        "Submitted successfully. You will be notified when posted.",
      );
      setIsOpen(false);
      form.reset();
      await queryClient.invalidateQueries({ queryKey: [queryKeys.me] });
      await queryClient.invalidateQueries({
        queryKey: [`@${user?.username}`],
      });
    } catch {
      toast.error("Failed to create post");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile],
  );

  const isDisabled = isPending || form.formState.isSubmitting || isCompressing;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: mimeToExtensions(CONSTANTS.POST.IMAGE_POST.ACCEPTED_MIME_TYPES),
    maxFiles: 1,
    disabled: isDisabled || !!file,
  });

  return (
    <CreateDialog
      icon={<Icons.ImagePost className="size-4" />}
      className="bg-chart-2"
      tooltip="Image Post"
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
        {file ? (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={URL.createObjectURL(file)}
              alt={watchCaption ?? ""}
              width={100}
              height={100}
            />
            <div className="flex flex-row items-center">
              <p className="text-sm font-medium">
                {shortenText(file.name, 20)}
              </p>
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
            Drag & drop the image here or click to choose
          </p>
        )}
      </Dropzone>

      <CaptionForm isDisabled={isDisabled} form={form} />
    </CreateDialog>
  );
}
