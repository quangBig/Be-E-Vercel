export declare class UpdatePaymentStatusDto {
    status: "pending" | "paid" | "failed";
    transactionId?: string;
}
