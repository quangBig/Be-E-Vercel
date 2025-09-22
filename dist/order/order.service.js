"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const orser_schemas_1 = require("./schemas/orser.schemas");
let OrderService = class OrderService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(dto, userId) {
        if (!userId) {
            throw new Error("userId is missing from request!");
        }
        const { items, shippingAddress, note, payment } = dto;
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingFee = 50000;
        const total = subtotal + shippingFee;
        const newOrder = new this.orderModel({
            userId,
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
    async findAll() {
        return this.orderModel
            .find()
            .populate("userId", "name email")
            .populate("items.productId", "name images")
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByUser(userId) {
        return this.orderModel
            .find({ userId })
            .populate("items.productId", "name images")
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate("userId", "name email")
            .populate("items.productId", "name images")
            .exec();
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        order.status = status;
        return order.save();
    }
    async updatePaymentStatus(id, status, transactionId) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        order.payment.status = status;
        if (transactionId) {
            order.payment["transactionId"] = transactionId;
        }
        return order.save();
    }
    async cancelOrder(id) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        if (order.status === "cancelled") {
            return order;
        }
        order.status = "cancelled";
        return order.save();
    }
    async remove(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        return order;
    }
    async getStatistics() {
        const stats = await this.orderModel.aggregate([
            {
                $facet: {
                    statusCounts: [
                        { $group: { _id: "$status", count: { $sum: 1 } } }
                    ],
                    revenue: [
                        { $match: { status: "completed" } },
                        { $group: { _id: null, total: { $sum: "$total" } } }
                    ],
                    totalOrders: [
                        { $count: "count" }
                    ],
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(orser_schemas_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map