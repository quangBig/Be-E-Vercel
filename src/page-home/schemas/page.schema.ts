import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
    @Prop({ required: true })
    title: string;

    @Prop()
    decs: string;

    @Prop()
    image: string;

    @Prop()
    link: string;

    @Prop()
    price: string;

    @Prop({ default: false })
    reverse: boolean;

    @Prop({ default: 0 })
    position: number; // để sắp xếp

    @Prop({ required: true })
    section: string; // phân loại: "hero", "card-shelf-carousel", "footer"

    @Prop()
    bannerTitle: string; // hiển thị: "Thế hệ mới nhất"
}


export const PageSchema = SchemaFactory.createForClass(Page);
