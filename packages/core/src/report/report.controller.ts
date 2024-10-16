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
    const { reportedUserId, ...rest } = createReportDto;
    if (userId === reportedUserId) {
      throw new HttpException(
        "You cannot report yourself.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.reportService.create({
      ...rest,
      reportedBy: { connect: { id: userId } },
      reportedUser: { connect: { id: reportedUserId } },
    });
  }
}
