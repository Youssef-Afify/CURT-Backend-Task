import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../../core/iControllers/iAuth.controller";
import { IAuthService } from "../../core/iServices/iAuth.service";
import { LoginSchema, SignupSchema } from "../../core/dtos/auth.dto";

export class AuthController implements IAuthController {
    constructor(private readonly authService: IAuthService) {}

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dto = SignupSchema.parse(req.body);
        const result = await this.authService.signup(dto);
        res.status(201).json(result);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dto = LoginSchema.parse(req.body);
        const result = await this.authService.login(dto);
        res.status(200).json(result);
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
        await this.authService.logout(token);
        res.status(204).send();
    }
}