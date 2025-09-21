import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdatePaymentStatusDto {
    @IsEnum(["pending", "paid", "failed"])
    status: "pending" | "paid" | "failed";

    @IsOptional()
    @IsString()
    transactionId?: string;
}
