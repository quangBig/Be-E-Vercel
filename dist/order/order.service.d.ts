import { Model } from "mongoose";
import { MomoService } from "src/momo/momo.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./schemas/orser.schemas";
export declare class OrderService {
    private orderModel;
    private momoService;
    constructor(orderModel: Model<OrderDocument>, momoService: MomoService);
    create(dto: CreateOrderDto, userId: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByUser(userId: string): Promise<Order[]>;
    findOne(id: string): Promise<OrderDocument>;
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
    checkout(orderId: string, amount: number): Promise<unknown>;
}
