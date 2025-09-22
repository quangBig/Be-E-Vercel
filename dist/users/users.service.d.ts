import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userData: {
        name: string;
        email: string;
        password: string;
        confirmpassword: string;
        role?: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findOne(filter: any): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    updateUser(userId: string, data: Partial<User>): Promise<User>;
}
