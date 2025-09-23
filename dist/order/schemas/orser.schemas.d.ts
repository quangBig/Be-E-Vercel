import mongoose, { Document, Types } from "mongoose";
export type OrderDocument = Order & Document & {
    _id: Types.ObjectId;
};
export declare class Order {
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
    payment: {
        method: "cod" | "momo";
        status: "pending" | "paid" | "failed";
        transactionId?: string;
    };
    note?: string;
    shippingFee: number;
    subtotal: number;
    total: number;
    status: string;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order, any, {}> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
