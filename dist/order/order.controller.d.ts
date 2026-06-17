import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { VnpayService } from "src/vnpay/vnpay.service";
export declare class OrderController {
    private readonly orderService;
    private readonly vnpayService;
    constructor(orderService: OrderService, vnpayService: VnpayService);
    create(dto: CreateOrderDto, req: any): Promise<import("./schemas/orser.schemas").Order>;
    findAll(): Promise<import("./schemas/orser.schemas").Order[]>;
    findByUser(userId: string): Promise<import("./schemas/orser.schemas").Order[]>;
    getStatistics(): Promise<{
        statusCounts: any;
        revenue: any;
        totalOrders: any;
        totalAmount: any;
    }>;
    findOne(id: string): Promise<import("./schemas/orser.schemas").OrderDocument>;
    updateStatus(id: string, status: string): Promise<import("./schemas/orser.schemas").Order>;
    updatePaymentStatus(id: string, status: "pending" | "paid" | "failed", transactionId?: string): Promise<import("./schemas/orser.schemas").Order>;
    cancelOrder(id: string): Promise<import("./schemas/orser.schemas").Order>;
    remove(id: string): Promise<import("./schemas/orser.schemas").Order>;
    checkout(id: string, req: any): Promise<{
        payUrl: string;
    }>;
    vnpayIpn(query: any): Promise<{
        RspCode: string;
        Message: any;
    }>;
}
