"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProductsSchema = exports.PageProducts = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PageProducts = class PageProducts {
    name;
    slug;
    image;
    bannerVideo;
    bannerContent;
    bannerConnect;
};
exports.PageProducts = PageProducts;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PageProducts.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PageProducts.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PageProducts.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        url: { type: String },
    })),
    __metadata("design:type", Object)
], PageProducts.prototype, "bannerVideo", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        (0, mongoose_1.raw)({
            image: { type: String },
            title: { type: String },
            description: { type: String }
        }),
    ]),
    __metadata("design:type", Array)
], PageProducts.prototype, "bannerContent", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        (0, mongoose_1.raw)({
            image: { type: String },
            content: { type: String },
            mainContent: { type: String }
        }),
    ]),
    __metadata("design:type", Array)
], PageProducts.prototype, "bannerConnect", void 0);
exports.PageProducts = PageProducts = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PageProducts);
exports.PageProductsSchema = mongoose_1.SchemaFactory.createForClass(PageProducts);
//# sourceMappingURL=page-products.schema.js.map