import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common";
import { CONSTANTS } from "src/common/constants";

export const imagePostValidators = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: ".(jpg|jpeg|png|gif)",
  })
  .addMaxSizeValidator({ maxSize: CONSTANTS.POST.POST_IMAGE_MAX_SIZE })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
