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
    const {
      reportedUserId,
      reason,
      reportType,
      commentId,
      description,
      postId,
    } = createReportDto;
    if (userId === reportedUserId) {
      throw new HttpException(
        "You cannot report yourself.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.reportService.create({
      reason,
      report_type: reportType,
      description,
      post: { connect: { id: postId } },
      comment: { connect: { id: commentId } },
      reported_by: { connect: { id: userId } },
      reported_user: { connect: { id: reportedUserId } },
    });
  }
}
