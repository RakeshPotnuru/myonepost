import { useRef, useState } from "react";

import { CONSTANTS } from "@1post/shared";
import type { Options } from "browser-image-compression";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

import { Heading } from "@/components/ui/heading";
import { ButtonLoader } from "@/components/ui/loaders/button-loader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import usePageStore from "@/lib/store/page";

import { useUpdateAvatar } from "./api/avatar";

export default function UserAvatar() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { page, updatePage } = usePageStore();

  const { mutateAsync, isPending } = useUpdateAvatar();

  const onSubmit = async () => {
    if (!file) return;

    let compressedFile;
    try {
      setIsCompressing(true);
      const options: Options = {
        maxSizeMB: CONSTANTS.USER.AVATAR.MAX_SIZE,
        useWebWorker: true,
        initialQuality: 0.8,
      };

      // Compress the image
      compressedFile = await imageCompression(file, options);
      // Double-check final size
      if (compressedFile.size > CONSTANTS.USER.AVATAR.MAX_SIZE) {
        toast.error(
          `Your image size is too large. Max size is ${CONSTANTS.USER.AVATAR.MAX_SIZE / (1024 * 1024)}MB`,
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
      const formData = new FormData();
      formData.append("file", compressedFile);

      const avatarUrl = await mutateAsync(formData);
      updatePage({ avatar_url: avatarUrl });
      setFile(null);

      toast.success("Avatar updated successfully.");
    } catch {
      // ignore
    }
  };

  const isDisabled = isPending || !file || isCompressing;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Heading level={3}>Avatar</Heading>
        <Button onClick={onSubmit} size={"sm"} disabled={isDisabled}>
          <ButtonLoader isLoading={isPending || isCompressing} />
          Save
        </Button>
      </div>
      <div className="flex items-center justify-around">
        <Avatar className="h-14 w-14">
          <AvatarImage
            src={file ? URL.createObjectURL(file) : (page?.avatar_url ?? "")}
          />
          <AvatarFallback>{page?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={CONSTANTS.USER.AVATAR.ACCEPTED_MIME_TYPES.join(",")}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          size={"sm"}
          variant={"secondary"}
          disabled={isPending}
        >
          Choose file
        </Button>
      </div>
    </div>
  );
}
