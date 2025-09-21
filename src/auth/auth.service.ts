import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    // Lấy danh sách user
    async getAllUsers() {
        // Bỏ password khi trả về
        const users = await this.userModel.find().select('-password').exec();
        return users;
    }

    // Đăng ký
    async register(createUserDto: CreateUserDto) {
        const { email, password, confirmpassword, name, phonenumber } =
            createUserDto;

        // Kiểm tra email tồn tại
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            phonenumber: phonenumber || null,
            role: 'user',
        });

        const { password: _, ...result } = user.toObject();
        return result;
    }

    // Đăng nhập
    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    // Xác thực user từ email + password
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    // Thêm số điện thoại cho user
    async addPhoneNumber(userId: string, phone: string) {
        const existingPhone = await this.usersService.findByPhone(phone);
        if (existingPhone) {
            throw new ConflictException('Số điện thoại đã tồn tại.');
        }

        return this.usersService.updateUser(userId, { phonenumber: phone });
    }

    // Đếm số user
    async countUsers(): Promise<number> {
        return this.userModel.countDocuments().exec();
    }

    // Tạo JWT token
    generateJwt(user: any) {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
