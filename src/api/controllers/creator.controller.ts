import { Request, Response, NextFunction } from "express";
import { ICreatorController } from "../../core/iControllers/iCreator.controller";
import { ProjectByCreatorPort } from "../../core/ports/project.port";
import { TeamByCreatorPort } from "../../core/ports/team.port";

export class CreatorController implements ICreatorController {
    constructor(
        private readonly projectByCreatorPort: ProjectByCreatorPort,
        private readonly teamByCreatorPort: TeamByCreatorPort,
    ) {}

    async getProjectsForCreator(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const projects = await this.projectByCreatorPort.getProjectsForCreator(req.params.id);
        res.status(200).json(projects);
    }

    async getTeamsForCreator(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const teams = await this.teamByCreatorPort.getTeamsForCreator(req.params.id);
        res.status(200).json(teams);
    }
}