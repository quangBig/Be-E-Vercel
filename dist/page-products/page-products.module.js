"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const page_products_schema_1 = require("./schemas/page-products.schema");
const page_products_controller_1 = require("./page-products.controller");
const page_products_service_1 = require("./page-products.service");
let PageProductsModule = class PageProductsModule {
};
exports.PageProductsModule = PageProductsModule;
exports.PageProductsModule = PageProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: page_products_schema_1.PageProducts.name, schema: page_products_schema_1.PageProductsSchema }])],
        controllers: [page_products_controller_1.PageProductsController],
        providers: [page_products_service_1.PageProductsService],
    })
], PageProductsModule);
//# sourceMappingURL=page-products.module.js.map