import { PartialType } from "@nestjs/mapped-types"
import { CreatePageProductDto } from "./create-page-products.dto"

export class UpdatePageProductDto extends PartialType(CreatePageProductDto) { }