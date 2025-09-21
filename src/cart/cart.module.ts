import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart, CartSchema } from "./schemas/cart.schemas";
import { Product, ProductSchema } from "src/products/schemas/products.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema },
    { name: Product.name, schema: ProductSchema }
    ])],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService],
})
export class CartModule { }
