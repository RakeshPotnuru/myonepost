import { Module } from "@nestjs/common";
import { GoogleNlpService } from "./google-nlp.service";

@Module({
  providers: [GoogleNlpService],
  exports: [GoogleNlpService],
})
export class GoogleNlpModule {}
