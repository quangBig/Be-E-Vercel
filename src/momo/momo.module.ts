import { Module } from "@nestjs/common";
import { MomoService } from "./momo.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [MomoService],
    exports: [MomoService], //  export cho OrderModule dùng
})
export class MomoModule { }
