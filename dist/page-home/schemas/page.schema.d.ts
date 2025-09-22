import { Document } from "mongoose";
export type PageDocument = Page & Document;
export declare class Page {
    title: string;
    decs: string;
    image: string;
    link: string;
    price: string;
    reverse: boolean;
    position: number;
    section: string;
    bannerTitle: string;
}
export declare const PageSchema: import("mongoose").Schema<Page, import("mongoose").Model<Page, any, any, any, Document<unknown, any, Page, any, {}> & Page & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Page, Document<unknown, {}, import("mongoose").FlatRecord<Page>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Page> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
