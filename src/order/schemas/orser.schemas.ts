import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: string;

    @Prop([
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            variantName: { type: String },
            color: { type: String },
            quantity: { type: Number, default: 1 },
            price: { type: Number }, // giá sau giảm
            originalPrice: { type: Number }, // giá gốc
            image: { type: String },
        },
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

    // 🏠 Địa chỉ giao hàng chi tiết
    @Prop({
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            address: { type: String, required: true },
            provinceCode: { type: Number, required: true },
            provinceName: { type: String, required: true },
            districtCode: { type: Number, required: true },
            districtName: { type: String, required: true },
            wardCode: { type: Number, required: true },
            wardName: { type: String, required: true },
        },
        required: true,
    })
    shippingAddress: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        provinceCode: number;
        provinceName: string;
        districtCode: number;
        districtName: string;
        wardCode: number;
        wardName: string;
    };

    // 💳 Thông tin thanh toán
    @Prop({
        type: {
            method: { type: String, enum: ["cod", "momo"], default: "cod" },
            status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
            transactionId: { type: String }, // nếu thanh toán online thì có
        },
        required: true,
    })
    payment: {
        method: "cod" | "momo";
        status: "pending" | "paid" | "failed";
        transactionId?: string;
    };

    @Prop()
    note?: string;

    @Prop({ default: 50000 })
    shippingFee: number;

    @Prop({ required: true })
    subtotal: number; // tổng giá trị sản phẩm (chưa phí ship)

    @Prop({ required: true })
    total: number; // subtotal + shippingFee

    @Prop({
        type: String,
        enum: ["pending", "shipping", "delivering", "completed", "cancelled"],
        default: "pending",
    })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
