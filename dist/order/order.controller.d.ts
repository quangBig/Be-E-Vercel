import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(dto: CreateOrderDto, req: any): Promise<import("./schemas/orser.schemas").Order>;
    findAll(): Promise<import("./schemas/orser.schemas").Order[]>;
    findByUser(userId: string): Promise<import("./schemas/orser.schemas").Order[]>;
    getStatistics(): Promise<{
        statusCounts: any;
        revenue: any;
        totalOrders: any;
        totalAmount: any;
    }>;
    findOne(id: string): Promise<import("./schemas/orser.schemas").Order>;
    updateStatus(id: string, status: string): Promise<import("./schemas/orser.schemas").Order>;
    updatePaymentStatus(id: string, status: "pending" | "paid" | "failed", transactionId?: string): Promise<import("./schemas/orser.schemas").Order>;
    cancelOrder(id: string): Promise<import("./schemas/orser.schemas").Order>;
    remove(id: string): Promise<import("./schemas/orser.schemas").Order>;
}
