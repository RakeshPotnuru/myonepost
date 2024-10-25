import { CONSTANTS } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @Length(1, CONSTANTS.POST.COMMENT.MAX_LENGTH)
  text: string;

  @ApiProperty()
  @IsUUID()
  postId: string;
}
