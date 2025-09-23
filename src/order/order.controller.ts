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
    NotFoundException,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

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
    async checkout(@Param("id") id: string) {
        const order = await this.orderService.findOne(id);
        if (!order) throw new NotFoundException("Order not found");

        // gọi MoMo
        return this.orderService.checkout(order._id.toString(), order.total);
    }

    // IPN callback từ MoMo
    @Post("momo-ipn")
    async momoIpn(@Body() body: any) {
        console.log("📩 MoMo callback:", body);

        if (body.resultCode === 0) {
            await this.orderService.updatePaymentStatus(
                body.orderId,
                "paid",
                body.transId
            );
        } else {
            await this.orderService.updatePaymentStatus(body.orderId, "failed");
        }

        return { message: "IPN received" };
    }

}
