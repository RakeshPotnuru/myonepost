import { CONSTANTS, ReportReason } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateReportDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(0, CONSTANTS.REPORT.DESCRIPTION.MAX_LENGTH)
  description?: string;

  @ApiProperty()
  @IsEnum(ReportReason)
  reason: ReportReason;

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
