import { Model } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./schemas/orser.schemas";
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(dto: CreateOrderDto, userId: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByUser(userId: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    updateStatus(id: string, status: string): Promise<Order>;
    updatePaymentStatus(id: string, status: "pending" | "paid" | "failed", transactionId?: string): Promise<Order>;
    cancelOrder(id: string): Promise<Order>;
    remove(id: string): Promise<Order>;
    getStatistics(): Promise<{
        statusCounts: any;
        revenue: any;
        totalOrders: any;
        totalAmount: any;
    }>;
}
