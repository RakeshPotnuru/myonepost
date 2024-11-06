import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CreateReportDto } from "./dto";
import { ReportService } from "./report.service";
import { ReportType } from "@1post/shared";

@ApiTags("Report")
@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: "Create a report" })
  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser("id") userId: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    const { reportedUserId, reason, commentId, description, postId } =
      createReportDto;
    if (userId === reportedUserId) {
      throw new HttpException(
        "You cannot report yourself.",
        HttpStatus.BAD_REQUEST,
      );
    }

    let reportType: ReportType = "USER";

    if (postId) {
      reportType = "POST";
    } else if (commentId) {
      reportType = "COMMENT";
    }

    return this.reportService.create({
      reason,
      report_type: reportType,
      description,
      ...(postId && {
        post: { connect: { id: postId } },
      }),
      ...(commentId && {
        comment: { connect: { id: commentId } },
      }),
      reported_by: { connect: { id: userId } },
      reported_user: { connect: { id: reportedUserId } },
    });
  }
}
