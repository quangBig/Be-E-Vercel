import { IsEnum } from "class-validator";

export class UpdateOrderStatusDto {
    @IsEnum(["pending", "shipping", "delivering", "completed", "cancelled"])
    status: "pending" | "shipping" | "delivering" | "completed" | "cancelled";
}
