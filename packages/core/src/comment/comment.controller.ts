import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: "Create comment" })
  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser("id") userId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(userId, createCommentDto);
  }

  @ApiOperation({ summary: "Delete comment" })
  @UseGuards(JwtGuard)
  @Delete(":postId")
  remove(@Param("postId") postId: string, @GetUser("id") userId: string) {
    return this.commentService.remove(postId, userId);
  }
}
