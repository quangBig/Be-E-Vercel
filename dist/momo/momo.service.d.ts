import { ConfigService } from "@nestjs/config";
export declare class MomoService {
    private configService;
    private accessKey;
    private secretKey;
    private partnerCode;
    private redirectUrl;
    private ipnUrl;
    constructor(configService: ConfigService);
    createPayment(amount: number, orderId: string): Promise<unknown>;
}
