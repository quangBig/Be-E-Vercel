import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
    Query,
    NotFoundException,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { VnpayService } from "src/vnpay/vnpay.service";

@Controller("orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly vnpayService: VnpayService
    ) { }

    // 🛒 Tạo đơn hàng
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() dto: CreateOrderDto, @Req() req) {
        console.log("User trong req:", req.user); // test xem có gì
        const userId = req.user?.userId || req.user?.userId;
        return this.orderService.create(dto, userId);
    }




    // 📋 Lấy tất cả đơn hàng (admin)
    @Get()
    async findAll() {
        return this.orderService.findAll();
    }

    // 👤 Lấy đơn theo user
    @Get("user/:userId")
    async findByUser(@Param("userId") userId: string) {
        return this.orderService.findByUser(userId);
    }

    @Get("statistics")
    async getStatistics() {
        return this.orderService.getStatistics();
    }

    // 🔍 Lấy chi tiết 1 đơn
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.orderService.findOne(id);
    }

    // 🚚 Update trạng thái đơn (pending → shipping → completed...)
    @Patch(":id/status")
    async updateStatus(@Param("id") id: string, @Body("status") status: string) {
        return this.orderService.updateStatus(id, status);
    }

    // 💳 Update trạng thái thanh toán (paid/failed)
    @Patch(":id/payment")
    async updatePaymentStatus(
        @Param("id") id: string,
        @Body("status") status: "pending" | "paid" | "failed",
        @Body("transactionId") transactionId?: string
    ) {
        return this.orderService.updatePaymentStatus(id, status, transactionId);
    }

    // ❌ Hủy đơn hàng (soft delete)
    @Patch(":id/cancel")
    async cancelOrder(@Param("id") id: string) {
        return this.orderService.cancelOrder(id);
    }

    // 🗑️ Xóa hẳn đơn hàng (hard delete)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.orderService.remove(id);
    }

    @Post("checkout/:id")
    @UseGuards(AuthGuard("jwt"))
    async checkout(@Param("id") id: string, @Req() req: any) {
        const order = await this.orderService.findOne(id);
        if (!order) throw new NotFoundException("Order not found");

        const ipAddr = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
        return this.orderService.checkout(order._id.toString(), order.total, order.payment.method, ipAddr);
    }

    // IPN callback từ VNPay
    @Get("vnpay-ipn")
    async vnpayIpn(@Query() query: any) {
        console.log("📩 VNPay callback IPN:", query);

        const isValid = this.vnpayService.verifySignature(query);
        if (!isValid) {
            return { RspCode: "97", Message: "Checksum failed" };
        }

        const orderId = query['vnp_TxnRef'];
        const responseCode = query['vnp_ResponseCode'];
        const transactionNo = query['vnp_TransactionNo'];
        const amount = Number(query['vnp_Amount']) / 100;

        try {
            const order = await this.orderService.findOne(orderId);
            if (!order) {
                return { RspCode: "01", Message: "Order not found" };
            }

            if (order.total !== amount) {
                return { RspCode: "04", Message: "Invalid amount" };
            }

            if (order.payment.status !== "pending") {
                return { RspCode: "02", Message: "Order already confirmed" };
            }

            if (responseCode === "00") {
                await this.orderService.updatePaymentStatus(orderId, "paid", transactionNo);
            } else {
                await this.orderService.updatePaymentStatus(orderId, "failed", transactionNo);
            }

            return { RspCode: "00", Message: "Confirm success" };
        } catch (error) {
            return { RspCode: "99", Message: error.message || "Unknown error" };
        }
    }

}
