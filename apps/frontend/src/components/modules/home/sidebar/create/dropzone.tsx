import type { DropzoneState } from "react-dropzone/.";

import { cn } from "@/utils/cn";

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Dropzone({
  getRootProps,
  getInputProps,
  isDragActive,
  isDragAccept,
  isDragReject,
  children,
}: DropzoneProps &
  Pick<
    DropzoneState,
    | "getRootProps"
    | "getInputProps"
    | "isDragAccept"
    | "isDragActive"
    | "isDragReject"
  >) {
  return (
    <div
      className={cn(
        "flex cursor-default flex-col items-center rounded-lg border border-dashed p-10 mt-5",
        {
          "border-primary": isDragActive,
          "border-destructive": isDragReject,
          "border-success": isDragAccept,
        },
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
