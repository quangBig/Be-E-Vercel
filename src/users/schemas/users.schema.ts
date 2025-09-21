import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({
        type: String,
        required: false,  // Không bắt buộc
        default: "",
        index: {
            unique: true,
            partialFilterExpression: { phonenumber: { $type: 'string' } }
        }
    })
    phonenumber?: string | null;

    @Prop({ required: false, trim: true })


    @Prop({ required: true })
    @Exclude()
    password: string;

    @Prop({ required: true, default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);