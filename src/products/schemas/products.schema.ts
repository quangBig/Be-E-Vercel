import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    Outstandingfeatures: string;

    @Prop()
    category: string;

    @Prop([String])
    images: string[];

    @Prop([
        {
            name: { type: String, required: true },
            price: { type: String, required: true }, // Giá gốc
            discountedPrice: { type: String },       // ✅ Giá sau khi giảm
            config: { type: String },
            colors: [
                {
                    name: { type: String },
                    value: { type: String },
                    hex: { type: String },
                    image: { type: String },
                    price: { type: String },          // Giá gốc của màu
                    discountedPrice: { type: String } // ✅ Giá sau khi giảm của màu
                }
            ]
        }
    ])
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

export const ProductSchema = SchemaFactory.createForClass(Product);
