import { CartService } from "./cart.service";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { AddToCartDto } from "./dto/create-cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/cart.schemas").CartDocument, {}, {}> & import("./schemas/cart.schemas").Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addToCart(req: any, dto: AddToCartDto, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cart.schemas").CartDocument, {}, {}> & import("./schemas/cart.schemas").Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateQuantity(req: any, productId: string, dto: UpdateCartDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cart.schemas").CartDocument, {}, {}> & import("./schemas/cart.schemas").Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeItem(req: any, productId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cart.schemas").CartDocument, {}, {}> & import("./schemas/cart.schemas").Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    clearCart(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/cart.schemas").CartDocument, {}, {}> & import("./schemas/cart.schemas").Cart & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
