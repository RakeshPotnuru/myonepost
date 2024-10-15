import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import { CONSTANTS } from "src/common/constants";

export class CreateTextPostDto {
  @ApiProperty()
  @IsString()
  @Length(1, CONSTANTS.POST.TEXT.MAX_LENGTH)
  text: string;
}

export class CreateImagePostDto {
  @ApiProperty()
  @IsString()
  @Length(0, CONSTANTS.POST.POST_MEDIA_CAPTION.MAX_LENGTH)
  @IsOptional()
  mediaCaption?: string;

  @ApiProperty({ type: "string", format: "binary", required: true })
  file: Express.Multer.File;
}

export class CreateVideoPostDto {
  @ApiProperty()
  @IsString()
  @Length(0, CONSTANTS.POST.POST_MEDIA_CAPTION.MAX_LENGTH)
  @IsOptional()
  mediaCaption?: string;
}

export class CreateAudioPostDto {
  @ApiProperty()
  @IsString()
  @Length(0, CONSTANTS.POST.POST_MEDIA_CAPTION.MAX_LENGTH)
  @IsOptional()
  mediaCaption?: string;
}
