import { CONSTANTS } from "@1post/shared";
import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common";

export const avatarValidators = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: ".(jpg|jpeg|png)",
  })
  .addMaxSizeValidator({ maxSize: CONSTANTS.USER.AVATAR_MAX_SIZE })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
