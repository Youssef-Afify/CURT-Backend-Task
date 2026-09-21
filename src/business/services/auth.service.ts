import bcrypt from "bcrypt";
import { LoginDto, SignupDto } from "../../core/dtos/auth.dto";
import { NotFoundError } from "../../core/errors/appError";
import { INeonAuthClient } from "../../core/iClients/iNeonAuthClient";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IUserRepository } from "../../core/iRepositories/iUser.repository";
import { AuthResult, IAuthService } from "../../core/iServices/iAuth.service";

export class AuthService implements IAuthService {
    constructor(
        private readonly neonAuthClient: INeonAuthClient,
        private readonly userRepository: IUserRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async signup(dto: SignupDto): Promise<AuthResult> {
        const { userId, token } = await this.neonAuthClient.signUp(
            dto.email,
            dto.password,
            dto.name,
        );
        
        const passwordHash = await bcrypt.hash(dto.password, 12);

        const user = await this.userRepository.create({
            userId,
            name: dto.name,
            email: dto.email,
            password: passwordHash,
        });

        this.logger.info("User signed up", { userId });
        return { token, user };
    }

    async login(dto: LoginDto): Promise<AuthResult> {
        const { userId, token } = await this.neonAuthClient.signIn(
            dto.email,
            dto.password,
        );

        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new NotFoundError(
                "This account has no profile yet. Complete signup through the app before logging in.",
            );
        }

        this.logger.info("User logged in", { userId });
        return { token, user };
    }

    async logout(token: string): Promise<void> {
        await this.neonAuthClient.signOut(token);
    }
}
