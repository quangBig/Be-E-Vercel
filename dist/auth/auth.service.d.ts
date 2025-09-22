import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private usersService;
    private jwtService;
    constructor(userModel: Model<User>, usersService: UsersService, jwtService: JwtService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    register(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        phonenumber?: string | null;
        role: string;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            _id: unknown;
            name: string;
            email: string;
            role: string;
        };
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    addPhoneNumber(userId: string, phone: string): Promise<User>;
    countUsers(): Promise<number>;
    generateJwt(user: any): {
        access_token: string;
        user: any;
    };
}
