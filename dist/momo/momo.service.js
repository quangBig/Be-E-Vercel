"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@nestjs/config");
let MomoService = class MomoService {
    configService;
    accessKey;
    secretKey;
    partnerCode;
    redirectUrl;
    ipnUrl;
    constructor(configService) {
        this.configService = configService;
        this.accessKey = this.configService.get("MOMO_ACCESS_KEY");
        this.secretKey = this.configService.get("MOMO_SECRET_KEY");
        this.partnerCode = this.configService.get("MOMO_PARTNER_CODE");
        this.redirectUrl = this.configService.get("MOMO_REDIRECT_URL");
        this.ipnUrl = this.configService.get("MOMO_IPN_URL");
    }
    async createPayment(amount, orderId) {
        const requestId = orderId + Date.now();
        const orderInfo = "Thanh toán qua MoMo";
        const requestType = "captureWallet";
        const extraData = "";
        const expireTime = new Date(Date.now() + 5 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        const rawSignature = `accessKey=${this.accessKey}` +
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
            expireTime,
            signature,
            lang: "vi",
        };
        const response = await axios_1.default.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody, { headers: { "Content-Type": "application/json" } });
        return response.data;
    }
};
exports.MomoService = MomoService;
exports.MomoService = MomoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MomoService);
//# sourceMappingURL=momo.service.js.map