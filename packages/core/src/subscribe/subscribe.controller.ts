import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CreateSubscribeDto } from "./dto";
import { SubscribeService } from "./subscribe.service";

@ApiTags("Subscribe")
@Controller("subscribe")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({ summary: "Subscribe to a user" })
  @UseGuards(JwtGuard)
  @Post()
  subscribe(
    @GetUser("id") userId: string,
    @Body() createSubscribeDto: CreateSubscribeDto,
  ) {
    const { subscribedToId } = createSubscribeDto;

    if (userId === subscribedToId) {
      throw new HttpException(
        "You cannot subscribe to yourself",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subscribeService.subscribe(userId, subscribedToId);
  }

  @ApiOperation({ summary: "Unsubscribe from a user" })
  @UseGuards(JwtGuard)
  @Delete(":id")
  unsubscribe(
    @GetUser("id") userId: string,
    @Param("id") subscribeToId: string,
  ) {
    if (userId === subscribeToId) {
      throw new HttpException(
        "You cannot unsubscribe from yourself",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.subscribeService.unsubscribe(userId, subscribeToId);
  }
}
