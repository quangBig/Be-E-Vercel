import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: string;

    @Prop([
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            variantName: { type: String },
            color: { type: String },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
            originalPrice: { type: Number },
            image: { type: String },
        }
    ])
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


export const CartSchema = SchemaFactory.createForClass(Cart);
