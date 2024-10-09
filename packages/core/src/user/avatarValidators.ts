import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common";
import { CONSTANTS } from "src/common/constants";

export const avatarValidators = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: ".(jpg|jpeg|png)",
  })
  .addMaxSizeValidator({ maxSize: CONSTANTS.USER.AVATAR_MAX_SIZE })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
