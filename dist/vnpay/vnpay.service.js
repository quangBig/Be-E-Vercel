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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnpayService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
let VnpayService = class VnpayService {
    configService;
    tmnCode;
    hashSecret;
    vnpUrl;
    returnUrl;
    constructor(configService) {
        this.configService = configService;
        this.tmnCode = this.configService.get("VNPAY_TMN_CODE") || this.configService.get("VNP_TMN_CODE");
        this.hashSecret = this.configService.get("VNPAY_HASH_SECRET") || this.configService.get("VNP_HASH_SECRET");
        this.vnpUrl = this.configService.get("VNPAY_URL") || this.configService.get("VNP_URL") || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        this.returnUrl = this.configService.get("VNPAY_RETURN_URL") || this.configService.get("VNP_RETURN_URL");
    }
    async createPayment(amount, orderId, ipAddress) {
        const date = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const createDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
        const vnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
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
    verifySignature(query) {
        const secureHash = query['vnp_SecureHash'];
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
    sortObject(obj) {
        const sorted = {};
        const keys = Object.keys(obj).sort();
        for (const key of keys) {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
        }
        return sorted;
    }
};
exports.VnpayService = VnpayService;
exports.VnpayService = VnpayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VnpayService);
//# sourceMappingURL=vnpay.service.js.map