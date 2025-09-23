import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MomoService {
    private accessKey: string;
    private secretKey: string;
    private partnerCode: string;
    private redirectUrl: string;
    private ipnUrl: string;

    constructor(private configService: ConfigService) {
        this.accessKey = this.configService.get<string>("MOMO_ACCESS_KEY")!;
        this.secretKey = this.configService.get<string>("MOMO_SECRET_KEY")!;
        this.partnerCode = this.configService.get<string>("MOMO_PARTNER_CODE")!;
        this.redirectUrl = this.configService.get<string>("MOMO_REDIRECT_URL")!;
        this.ipnUrl = this.configService.get<string>("MOMO_IPN_URL")!;
    }

    async createPayment(amount: number, orderId: string) {
        const requestId = orderId + Date.now();
        const orderInfo = "Thanh toán qua MoMo";
        const requestType = "captureWallet";
        const extraData = "";

        // set expireTime = 5 phút sau (định dạng yyyy-MM-dd HH:mm:ss)
        const expireTime = new Date(Date.now() + 5 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        // Raw signature (KHÔNG đưa expireTime vào rawSignature, docs MoMo chưa support param này trong signature)
        const rawSignature =
            `accessKey=${this.accessKey}` +
            `&amount=${amount}` +
            `&extraData=${extraData}` +
            `&ipnUrl=${this.ipnUrl}` +
            `&orderId=${orderId}` +
            `&orderInfo=${orderInfo}` +
            `&partnerCode=${this.partnerCode}` +
            `&redirectUrl=${this.redirectUrl}` +
            `&requestId=${requestId}` +
            `&requestType=${requestType}`;

        const signature = crypto
            .createHmac("sha256", this.secretKey)
            .update(rawSignature)
            .digest("hex");

        const requestBody = {
            partnerCode: this.partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl: this.redirectUrl,
            ipnUrl: this.ipnUrl,
            requestType,
            extraData,
            expireTime, // đúng format yyyy-MM-dd HH:mm:ss
            signature,
            lang: "vi",
        };

        const response = await axios.post(
            "https://test-payment.momo.vn/v2/gateway/api/create",
            requestBody,
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    }
}
