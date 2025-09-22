"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePageProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_page_products_dto_1 = require("./create-page-products.dto");
class UpdatePageProductDto extends (0, mapped_types_1.PartialType)(create_page_products_dto_1.CreatePageProductDto) {
}
exports.UpdatePageProductDto = UpdatePageProductDto;
//# sourceMappingURL=update-page-product.dto.js.map