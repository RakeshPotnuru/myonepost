import { CONSTANTS } from "@1post/shared";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class UpdateUsernameDto {
  @ApiProperty()
  @IsString()
  @Length(
    CONSTANTS.USER.USERNAME.MIN_LENGTH,
    CONSTANTS.USER.USERNAME.MAX_LENGTH,
  )
  @Matches(/^\w+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  username: string;
}
