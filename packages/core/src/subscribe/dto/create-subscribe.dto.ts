import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateSubscribeDto {
  @ApiProperty()
  @IsUUID()
  subscribedToId: string;
}
