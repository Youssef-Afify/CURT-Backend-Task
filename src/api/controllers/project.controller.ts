import { Request, Response, NextFunction } from "express";
import { IProjectController } from "../../core/iControllers/iProject.controller";
import { IProjectService } from "../../core/iServices/iProject.service";
import { CreateProjectSchema, UpdateProjectSchema } from "../../core/dtos/project.dto";

export class ProjectController implements IProjectController {
    constructor(private readonly projectService: IProjectService) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = CreateProjectSchema.parse(req.body);
        const project = await this.projectService.create(dto);
        res.status(201).json(project);
    }

    async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const project = await this.projectService.getById(req.params.id);
        res.status(200).json(project);
    }

    async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UpdateProjectSchema.parse(req.body);
        const project = await this.projectService.update(req.params.id, dto);
        res.status(200).json(project);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        await this.projectService.delete(req.params.id);
        res.status(204).send();
    }

    async getAllByUserId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const userProjects = await this.projectService.getAllByUserId(req.params.user_id);
        res.status(200).json(userProjects);
    }

    async getAllByCreatorId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const creatorProjects = await this.projectService.getAllByCreatorId(req.params.creator_id);
        res.status(200).json(creatorProjects);
    }
}
