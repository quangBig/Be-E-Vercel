import { Cart, CartDocument } from "./schemas/cart.schemas";
import { Model } from "mongoose";
import { AddToCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ProductDocument } from "src/products/schemas/products.schema";
export declare class CartService {
    private cartModel;
    private productModel;
    constructor(cartModel: Model<CartDocument>, productModel: Model<ProductDocument>);
    getCart(userId: string): Promise<(import("mongoose").Document<unknown, {}, CartDocument, {}, {}> & Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addToCart(userId: string, dto: AddToCartDto): Promise<import("mongoose").Document<unknown, {}, CartDocument, {}, {}> & Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateQuantity(userId: string, productId: string, dto: UpdateCartDto): Promise<import("mongoose").Document<unknown, {}, CartDocument, {}, {}> & Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeItem(userId: string, productId: string): Promise<import("mongoose").Document<unknown, {}, CartDocument, {}, {}> & Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    clearCart(userId: string): Promise<(import("mongoose").Document<unknown, {}, CartDocument, {}, {}> & Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
