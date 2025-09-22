export declare class CreateOrderDto {
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
    note?: string;
    payment?: {
        method: "cod" | "momo";
        status: "pending" | "paid" | "failed";
    };
}
