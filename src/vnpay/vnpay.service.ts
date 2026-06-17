import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class VnpayService {
    private tmnCode: string;
    private hashSecret: string;
    private vnpUrl: string;
    private returnUrl: string;

    constructor(private configService: ConfigService) {
        this.tmnCode = this.configService.get<string>("VNPAY_TMN_CODE") || this.configService.get<string>("VNP_TMN_CODE")!;
        this.hashSecret = this.configService.get<string>("VNPAY_HASH_SECRET") || this.configService.get<string>("VNP_HASH_SECRET")!;
        this.vnpUrl = this.configService.get<string>("VNPAY_URL") || this.configService.get<string>("VNP_URL") || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        this.returnUrl = this.configService.get<string>("VNPAY_RETURN_URL") || this.configService.get<string>("VNP_RETURN_URL")!;
    }

    async createPayment(amount: number, orderId: string, ipAddress: string): Promise<string> {
        const date = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const createDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

        const vnpParams: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100, // VNPay expects VND amount multiplied by 100
            vnp_ReturnUrl: this.returnUrl,
            vnp_IpAddr: ipAddress,
            vnp_CreateDate: createDate,
        };

        const sortedParams = this.sortObject(vnpParams);
        const signData = Object.keys(sortedParams)
            .map(key => `${key}=${sortedParams[key]}`)
            .join('&');

        const hmac = crypto.createHmac("sha512", this.hashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        sortedParams['vnp_SecureHash'] = signed;
        const paymentUrl = `${this.vnpUrl}?` + Object.keys(sortedParams)
            .map(key => `${key}=${sortedParams[key]}`)
            .join('&');

        return paymentUrl;
    }

    verifySignature(query: any): boolean {
        const secureHash = query['vnp_SecureHash'];
        
        // Remove hash parameters before signing check
        const params = { ...query };
        delete params['vnp_SecureHash'];
        delete params['vnp_SecureHashType'];

        const sortedParams = this.sortObject(params);
        const signData = Object.keys(sortedParams)
            .map(key => `${key}=${sortedParams[key]}`)
            .join('&');

        const hmac = crypto.createHmac("sha512", this.hashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        return secureHash === signed;
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const keys = Object.keys(obj).sort();
        for (const key of keys) {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
        }
        return sorted;
    }
}
