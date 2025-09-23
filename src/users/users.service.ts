import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(userData: {
        name: string;
        email: string;
        password: string;
        confirmpassword: string;
        role?: string;
    }): Promise<User> {
        // Kiểm tra email tồn tại
        const existingEmail = await this.userModel.findOne({ email: userData.email }).exec();
        if (existingEmail) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Kiểm tra pass và confirmpass
        if (userData.password !== userData.confirmpassword) {
            throw new ConflictException('Sai mật khẩu hoặc nhập lại mật khẩu');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new this.userModel({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user'
        });

        return newUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findOne(filter: any): Promise<User | null> {
        return this.userModel.findOne(filter).exec();
    }

    async findByPhone(phone: string): Promise<User | null> {
        return this.userModel.findOne({ phoneNumber: phone }).exec();
    }
    // thêm các trường về giới tính địa chỉ ngày sinh 
    async updateUser(userId: string, data: Partial<User>): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, data, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

    // async về sau khi login thì nhập thông tin người dùng
}