import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsString } from "class-validator";

export class UpdateNotificationDto {
  @ApiProperty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  ids: string[];
}
