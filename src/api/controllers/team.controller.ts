import { Request, Response, NextFunction } from "express";
import { ITeamController } from "../../core/iControllers/iTeam.controller";
import { ITeamService } from "../../core/iServices/iTeam.service";
import { CreateTeamSchema, UpdateTeamSchema } from "../../core/dtos/team.dto";
import { UserByTeamPort } from "../../core/ports/user.port";

export class TeamController implements ITeamController {
    constructor(
        private readonly teamService: ITeamService,
        private readonly userByTeamPort: UserByTeamPort,
    ) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = CreateTeamSchema.parse(req.body);
        const team = await this.teamService.create(dto);
        res.status(201).json(team);
    }

    async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const team = await this.teamService.getById(req.params.id);
        res.status(200).json(team);
    }

    async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UpdateTeamSchema.parse(req.body);
        const team = await this.teamService.update(req.params.id, dto);
        res.status(200).json(team);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        await this.teamService.delete(req.params.id);
        res.status(204).send();
    }

    async getUsersForTeam(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const users = await this.userByTeamPort.getUsersForTeam(req.params.id);
        res.status(200).json(users);
    }
}
