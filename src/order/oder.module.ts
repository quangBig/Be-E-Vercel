import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { VnpayModule } from "src/vnpay/vnpay.module";
import { Order, OrderSchema } from "./schemas/orser.schemas";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        VnpayModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
