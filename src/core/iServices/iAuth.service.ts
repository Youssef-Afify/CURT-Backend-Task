import { User } from "../entities/user.entity";
import { SignupDto, LoginDto } from "../dtos/auth.dto";

export interface AuthResult {
    token: string;
    user: User;
}

export interface IAuthService {
    signup(dto: SignupDto): Promise<AuthResult>;
    login(dto: LoginDto): Promise<AuthResult>;
    logout(token: string): Promise<void>;
}
