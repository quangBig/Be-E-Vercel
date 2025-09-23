import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/users.schema").User, {}, {}> & import("../users/schemas/users.schema").User & Required<{
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
        user: any;
    }>;
    getProfile(req: any): any;
    getAdminData(): string;
    countUsers(): Promise<{
        total: number;
    }>;
    ping(): {
        message: string;
    };
}
