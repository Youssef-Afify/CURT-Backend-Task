import { Request, Response, NextFunction } from "express";
import { ITeamController } from "../../core/iControllers/iTeam.controller";
import { ITeamService } from "../../core/iServices/iTeam.service";
import { CreateTeamSchema, UpdateTeamSchema } from "../../core/dtos/team.dto";

export class TeamController implements ITeamController {
    constructor(private readonly teamService: ITeamService) {}

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

    async getAllByUserId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const userTeams = await this.teamService.getAllByUserId(req.params.user_id);
        res.status(200).json(userTeams);
    }

    async getAllByCreatorId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const creatorTeams = await this.teamService.getAllByCreatorId(req.params.creator_id);
        res.status(200).json(creatorTeams);
    }
}
