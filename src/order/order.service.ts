import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { VnpayService } from "src/vnpay/vnpay.service";
import { Model } from "mongoose";

import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./schemas/orser.schemas";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
        private vnpayService: VnpayService
    ) { }

    // 🛒 Tạo đơn hàng
    async create(dto: CreateOrderDto, userId: string): Promise<Order> {
        if (!userId) {
            throw new Error("userId is missing from request!");
        }

        const { items, shippingAddress, note, payment } = dto;
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingFee = 50000;
        const total = subtotal + shippingFee;

        const newOrder = new this.orderModel({
            userId, // <-- cái này sẽ có giá trị
            items,
            shippingAddress,
            note,
            payment: payment || { method: "cod", status: "pending" },
            subtotal,
            shippingFee,
            total,
            status: "pending",
        });

        return newOrder.save();
    }


    // 📋 Lấy tất cả đơn hàng (admin)
    async findAll(): Promise<Order[]> {
        return this.orderModel
            .find()
            .populate("userId", "name email")
            .populate("items.productId", "name images")
            .sort({ createdAt: -1 })
            .exec();
    }

    // 👤 Lấy đơn hàng theo userId
    async findByUser(userId: string): Promise<Order[]> {
        return this.orderModel
            .find({ userId })
            .populate("items.productId", "name images")
            .sort({ createdAt: -1 })
            .exec();
    }

    // 🔍 Lấy chi tiết 1 đơn
    async findOne(id: string): Promise<OrderDocument> {
        const order = await this.orderModel
            .findById(id)
            .populate("userId", "name email")
            .populate("items.productId", "name images")
            .exec();

        if (!order) throw new NotFoundException("Order not found");
        return order;
    }

    // 🚚 Update trạng thái đơn (admin / backend)
    async updateStatus(id: string, status: string): Promise<Order> {
        const order = await this.orderModel.findById(id);
        if (!order) throw new NotFoundException("Order not found");

        order.status = status;
        return order.save();
    }

    // 💳 Update trạng thái thanh toán
    async updatePaymentStatus(
        id: string,
        status: "pending" | "paid" | "failed",
        transactionId?: string
    ): Promise<Order> {
        const order = await this.orderModel.findById(id);
        if (!order) throw new NotFoundException("Order not found");

        order.payment.status = status;
        if (transactionId) {
            order.payment["transactionId"] = transactionId;
        }

        return order.save();
    }

    // ❌ Hủy đơn hàng (soft delete)
    async cancelOrder(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id);
        if (!order) throw new NotFoundException("Order not found");

        if (order.status === "cancelled") {
            return order; // đã hủy rồi thì trả về luôn
        }

        order.status = "cancelled";
        return order.save();
    }

    // 🗑️ Xóa hẳn đơn hàng (hard delete - chỉ nên cho admin)
    async remove(id: string): Promise<Order> {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order) throw new NotFoundException("Order not found");
        return order;
    }

    // 📊 Thống kê đơn hàng
    async getStatistics() {

        const stats = await this.orderModel.aggregate([
            {
                $facet: {
                    // Đếm số đơn theo trạng thái
                    statusCounts: [
                        { $group: { _id: "$status", count: { $sum: 1 } } }
                    ],

                    // Tổng doanh thu (chỉ tính đơn completed)
                    revenue: [
                        { $match: { status: "completed" } },
                        { $group: { _id: null, total: { $sum: "$total" } } }
                    ],

                    // Tổng số đơn
                    totalOrders: [
                        { $count: "count" }
                    ],

                    // Tổng tiền tất cả đơn (không phân biệt trạng thái)
                    totalAmount: [
                        { $group: { _id: null, total: { $sum: "$total" } } }
                    ]
                }
            }
        ]);

        return {
            statusCounts: stats[0].statusCounts,
            revenue: stats[0].revenue[0]?.total || 0,
            totalOrders: stats[0].totalOrders[0]?.count || 0,
            totalAmount: stats[0].totalAmount[0]?.total || 0,
        };
    }

    async checkout(orderId: string, amount: number, paymentMethod: string, ipAddress?: string) {
        if (paymentMethod === "vnpay") {
            const payUrl = await this.vnpayService.createPayment(amount, orderId, ipAddress || "127.0.0.1");
            return { payUrl };
        }
        throw new Error("Unsupported payment method: " + paymentMethod);
    }


}
