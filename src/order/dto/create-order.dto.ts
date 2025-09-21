import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from "class-validator";

export class CreateOrderDto {


    @IsArray()
    items: {
        productId: string;
        variantName?: string;
        color?: string;
        quantity: number;
        price: number;
        originalPrice: number;
        image: string;
    }[];

    shippingAddress: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        provinceCode?: number;
        provinceName?: string;
        districtCode?: number;
        districtName?: string;
        wardCode?: number;
        wardName?: string;
    };

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    payment?: {
        method: "cod" | "momo";
        status: "pending" | "paid" | "failed";
    };
}
