import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { MomoModule } from "src/momo/momo.module"; //  import MomoModule
import { Order, OrderSchema } from "./schemas/orser.schemas";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        MomoModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
