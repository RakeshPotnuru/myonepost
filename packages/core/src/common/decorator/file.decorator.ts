import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiConsumes } from "@nestjs/swagger";

export function ApiFileUpload({
  fieldName = "file",
  allowedTypes = [],
}: {
  fieldName?: string;
  allowedTypes?: string[];
} = {}) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        fileFilter: (_req, file, callback) => {
          if (
            allowedTypes.length === 0 ||
            allowedTypes.includes(file.mimetype)
          ) {
            callback(null, true);
          } else {
            callback(new Error("Invalid file type"), false);
          }
        },
      } as MulterOptions),
    ),
    ApiConsumes("multipart/form-data"),
  );
}
