import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";
import { CONSTANTS } from "src/common/constants";

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @Length(1, CONSTANTS.POST.COMMENT.MAX_LENGTH)
  text: string;

  @ApiProperty()
  @IsUUID()
  postId: string;
}
