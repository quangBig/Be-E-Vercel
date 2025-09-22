import mongoose, { Document, Types } from "mongoose";
export type CartDocument = Cart & Document;
export declare class Cart {
    userId: string;
    items: {
        productId: string;
        variantName?: string;
        color?: string;
        quantity: number;
        price: number;
        originalPrice: number;
        image: string;
    }[];
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart, any, {}> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cart>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Cart> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
