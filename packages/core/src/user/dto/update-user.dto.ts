import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";
import { CONSTANTS } from "src/common/constants";

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, CONSTANTS.USER.BIO.MAX_LENGTH)
  bio?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(
    CONSTANTS.USER.DISPLAY_NAME.MIN_LENGTH,
    CONSTANTS.USER.DISPLAY_NAME.MAX_LENGTH,
  )
  displayName?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  url?: string;
}
