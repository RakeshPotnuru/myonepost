import { CONSTANTS } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, CONSTANTS.USER.BIO.MAX_LENGTH)
  bio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(
    CONSTANTS.USER.DISPLAY_NAME.MIN_LENGTH,
    CONSTANTS.USER.DISPLAY_NAME.MAX_LENGTH,
  )
  display_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_private?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value || undefined)
  @IsUrl()
  @Length(0, CONSTANTS.USER.URL.MAX_LENGTH)
  url?: string;
}
