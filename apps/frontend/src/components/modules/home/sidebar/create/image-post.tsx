"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import { CONSTANTS } from "@1post/shared";
import type { Options } from "browser-image-compression";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import type { z } from "zod";

import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/reusables/button";
import { queryClient } from "@/lib/providers/react-query";
import { mimeToExtensions } from "@/utils/mime-to-extensions";
import { shortenText } from "@/utils/text-shortener";

import { useCreateImagePost } from "./api/create";
import type { CaptionFormSchema } from "./caption-form";
import CaptionForm, { useCaptionForm } from "./caption-form";
import CreateDialog from "./create-dialog";
import Dropzone from "./dropzone";

export default function CreateImagePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const { mutateAsync, isPending } = useCreateImagePost();

  const { form, watchCaption, file, setFile } = useCaptionForm();

  const onSubmit = async (values: z.infer<typeof CaptionFormSchema>) => {
    if (!file) {
      return;
    }

    try {
      setIsCompressing(true);
      const options: Options = {
        maxSizeMB: CONSTANTS.POST.IMAGE_POST.MAX_SIZE,
        useWebWorker: true,
        initialQuality: 0.8,
      };
      console.log("Size before compression:", file.size);

      // Compress the image
      const compressedFile = await imageCompression(file, options);
      console.log("Size after compression:", compressedFile.size);
      // Double-check final size
      if (compressedFile.size > CONSTANTS.POST.IMAGE_POST.MAX_SIZE) {
        toast.error(
          `Your image size is too large. Max size is ${CONSTANTS.POST.IMAGE_POST.MAX_SIZE / 1024}MB`,
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
      data.append("file", file);
      if (values.caption) data.append("mediaCaption", values.caption);

      await mutateAsync(data);

      setIsOpen(false);
      form.reset({
        caption: "",
      });
      await queryClient.invalidateQueries();
    } catch {
      // ignore
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
          <p className="text-muted-foreground">Drag & drop the image here</p>
        )}
      </Dropzone>

      <CaptionForm isDisabled={isDisabled} />
    </CreateDialog>
  );
}
