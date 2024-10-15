import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreatePostLikeDto {
  @ApiProperty()
  @IsUUID()
  postId: string;
}

export class CreateCommentLikeDto {
  @ApiProperty()
  @IsUUID()
  commentId: string;
}
