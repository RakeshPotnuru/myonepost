import { CONSTANTS } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
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
  displayName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  url?: string;
}
