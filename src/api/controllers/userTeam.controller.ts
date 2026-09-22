import { Request, Response, NextFunction } from "express";
import { IUserTeamController } from "../../core/iControllers/iUserTeam.controller";
import { IUserTeamService } from "../../core/iServices/iUserTeam.service";
import { UserTeamSchema } from "../../core/dtos/userTeam.dto";

export class UserTeamController implements IUserTeamController {
    constructor(
        private readonly userTeamService: IUserTeamService
    ) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserTeamSchema.parse(req.body);
        const userTeam = await this.userTeamService.create(dto);
        res.status(201).json(userTeam);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserTeamSchema.parse(req.body);
        await this.userTeamService.delete(dto);
        res.status(204).send();
    }
}
