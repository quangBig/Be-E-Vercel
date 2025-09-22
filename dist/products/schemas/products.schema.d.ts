import { Document } from "mongoose";
export type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    Outstandingfeatures: string;
    category: string;
    images: string[];
    variants: {
        name: string;
        price: string;
        discountedPrice?: string;
        config: string;
        colors: {
            name: string;
            value: string;
            hex: string;
            image: string;
            price: string;
            discountedPrice?: string;
        }[];
    }[];
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product, any, {}> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
