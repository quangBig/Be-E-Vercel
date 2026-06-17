import { ConfigService } from "@nestjs/config";
export declare class VnpayService {
    private configService;
    private tmnCode;
    private hashSecret;
    private vnpUrl;
    private returnUrl;
    constructor(configService: ConfigService);
    createPayment(amount: number, orderId: string, ipAddress: string): Promise<string>;
    verifySignature(query: any): boolean;
    private sortObject;
}
