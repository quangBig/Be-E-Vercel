"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_products_dto_1 = require("./create-products.dto");
class UpdateProductDto extends (0, mapped_types_1.PartialType)(create_products_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=update-products.dto.js.map