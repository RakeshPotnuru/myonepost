import { CONSTANTS, users } from "@1post/shared";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard, PageGuard } from "src/auth/guard";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { ApiFileUpload } from "src/common/decorator";
import { avatarValidators } from "./avatarValidators";
import { UpdateAvatarDto, UpdateUserDto, UpdateUsernameDto } from "./dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @ApiOperation({ summary: "Get current user" })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get("me")
  me(@GetUser("id") userId: string) {
    return this.userService.me(userId);
  }

  @ApiOperation({ summary: "Get a user page (profile + post)" })
  @HttpCode(HttpStatus.OK)
  @UseGuards(PageGuard)
  @Get(":username")
  getPage(@Param("username") username: string, @GetUser() user: users) {
    return this.userService.getPage(username, user);
  }

  @ApiOperation({ summary: "Update current user" })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Patch()
  update(@GetUser("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Update current user username" })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Patch("username")
  updateUsername(
    @GetUser("id") id: string,
    @Body() updateUsernameDto: UpdateUsernameDto,
  ) {
    this.userService.update(id, updateUsernameDto);
  }

  @ApiOperation({ summary: "Upload and update current user avatar" })
  @HttpCode(HttpStatus.OK)
  @ApiFileUpload({ allowedTypes: ["image/png", "image/jpeg", "images/jpg"] })
  @ApiBody({
    type: UpdateAvatarDto,
  })
  @UseGuards(JwtGuard)
  @Post("avatar")
  async updateAvatar(
    @GetUser("id") userId: string,
    @UploadedFile(avatarValidators)
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadImage(
      file,
      CONSTANTS.ASSET_FOLDERS.AVATARS,
      userId,
    );

    const avatarUrl = result.secure_url;

    await this.userService.update(userId, { avatar_url: avatarUrl });

    return { avatarUrl };
  }
}

/**
 * 
 * import type { protos } from "@google-cloud/language";
import { LanguageServiceClient } from "@google-cloud/language";
import type { Response } from "express";
import { z } from "zod";

import { CONSTANTS } from "../../config/constants";
import { zParse } from "../../middlewares/validate";
import { AuthenticatedRequest } from "../../middlewares/verify-jwt";
import prisma from "../../utils/prisma";
import PostService from "./post.service";

export default class PostController extends PostService {
  createTextPostHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const post = await zParse(
        z.object({
          text: z.string().min(1).max(CONSTANTS.POST.TEXT.MAX_LENGTH),
        }),
        req.body,
      );

      if (!req.user?.id) {
        return res.status(401).json({ error: "User ID not found" });
      }

      const profile = await prisma.profile.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!profile) {
        return res.status(404).json({ error: "users not found" });
      }

      if (profile.nextPostAllowedAt && profile.nextPostAllowedAt > new Date()) {
        return res.status(429).json({
          error: "You can update post once every 24 hours",
        });
      }

      // check if text is safe

      await this.createPost({
        postType: "TEXT",
        text: post.text,
        profile: {
          connect: { id: profile.id },
        },
      });

      return res.status(201);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Error creating post" });
    }
  };

  private static async isTextSafe(text: string) {
    const client = new LanguageServiceClient({
      projectId: "my-one-post",
    });

    const document: protos.google.cloud.language.v1.IModerateTextRequest["document"] =
      {
        content: text,
        type: "PLAIN_TEXT",
      };

    const [result] = await client.moderateText({ document });

    return result.moderationCategories?.every(
      (category) => (category.confidence ?? 0) < 0.5,
    );
  }
}
export default class PostService {
  async createPost(data: Prisma.PostCreateInput) {
    await prisma.$transaction([
      // delete previous post if exist
      prisma.post.deleteMany({
        where: {
          profileId: data.profile.connect?.id,
        },
      }),
      // create new post
      prisma.post.create({
        data,
      }),
      // update profile nextPostAllowedAt
      prisma.profile.update({
        where: {
          id: data.profile.connect?.id,
        },
        data: {
          nextPostAllowedAt: new Date(
            Date.now() + CONSTANTS.POST.NEXT_POST_ALLOWED_AT,
          ), // 24 hours
        },
      }),
    ]);
  }
}
 */
