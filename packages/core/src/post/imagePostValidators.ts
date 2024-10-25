import { CONSTANTS } from "@1post/shared";
import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common";

export const imagePostValidators = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: ".(jpg|jpeg|png|gif)",
  })
  .addMaxSizeValidator({ maxSize: CONSTANTS.POST.IMAGE_POST.MAX_SIZE })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
