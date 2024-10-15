import { Module } from "@nestjs/common";
import { MuxService } from "./mux.service";

@Module({
  providers: [MuxService],
  exports: [MuxService],
})
export class MuxModule {}
