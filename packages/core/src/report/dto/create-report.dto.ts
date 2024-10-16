import { ApiProperty } from "@nestjs/swagger";
import { ReportReason, ReportType } from "@prisma/client";
import { IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { CONSTANTS } from "src/common/constants";

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(
    CONSTANTS.REPORT.DESCRIPTION.MIN_LENGTH,
    CONSTANTS.REPORT.DESCRIPTION.MAX_LENGTH,
  )
  description?: string;

  @ApiProperty()
  @IsEnum(ReportReason)
  reason: ReportReason;

  @ApiProperty()
  @IsEnum(ReportType)
  reportType: ReportType;

  @ApiProperty()
  @IsUUID()
  reportedUserId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  postId?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  commentId?: string;
}
