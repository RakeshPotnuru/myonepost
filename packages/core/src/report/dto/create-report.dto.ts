import { CONSTANTS, ReportReason, ReportType } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateReportDto {
  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  postId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  commentId?: string;
}
