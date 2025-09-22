import { Document } from "mongoose";
export type PageProductsDocument = PageProducts & Document;
export declare class PageProducts {
    name: string;
    slug: string;
    image: string;
    bannerVideo?: {
        url: string;
    };
    bannerContent?: {
        image?: string;
        title?: string;
        description?: string;
    }[];
    bannerConnect?: {
        image?: string;
        content?: string;
        mainContent?: string;
    }[];
}
export declare const PageProductsSchema: import("mongoose").Schema<PageProducts, import("mongoose").Model<PageProducts, any, any, any, Document<unknown, any, PageProducts, any, {}> & PageProducts & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PageProducts, Document<unknown, {}, import("mongoose").FlatRecord<PageProducts>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PageProducts> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
