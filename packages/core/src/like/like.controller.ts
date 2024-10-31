import { users } from "@1post/shared";
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
import { CreateCommentLikeDto, CreatePostLikeDto } from "./dto/create-like.dto";
import { LikeService } from "./like.service";

@ApiTags("Like")
@Controller("like")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: "Like a post" })
  @UseGuards(JwtGuard)
  @Post("post")
  likePost(
    @GetUser() user: users,
    @Body() createPostLikeDto: CreatePostLikeDto,
  ) {
    return this.likeService.likePost(user, createPostLikeDto.postId);
  }

  @ApiOperation({ summary: "Like a comment" })
  @UseGuards(JwtGuard)
  @Post("comment")
  likeComment(
    @GetUser() user: users,
    @Body() createCommentLikeDto: CreateCommentLikeDto,
  ) {
    return this.likeService.likeComment(user, createCommentLikeDto.commentId);
  }

  @ApiOperation({ summary: "Unlike a post" })
  @UseGuards(JwtGuard)
  @Delete("post/:id")
  unlikePost(@GetUser("id") userId: string, @Param("id") postId: string) {
    return this.likeService.unlikePost(userId, postId);
  }

  @ApiOperation({ summary: "Unlike a comment" })
  @UseGuards(JwtGuard)
  @Delete("comment/:id")
  unlikeComment(@GetUser("id") userId: string, @Param("id") commentId: string) {
    return this.likeService.unlikeComment(userId, commentId);
  }
}
