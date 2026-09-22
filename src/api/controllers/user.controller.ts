import { Request, Response, NextFunction } from "express";
import { IUserController } from "../../core/iControllers/iUser.controller";
import { IUserService } from "../../core/iServices/iUser.service";
import { CreateUserSchema, UpdateUserSchema } from "../../core/dtos/user.dto";
import { ProjectByUserPort } from "../../core/ports/project.port";
import { TaskByUserPort } from "../../core/ports/task.port";
import { TeamByUserPort } from "../../core/ports/team.port";

export class UserController implements IUserController {
    constructor(
        private readonly userService: IUserService,
        private readonly projectByUserPort: ProjectByUserPort,
        private readonly taskByUserPort: TaskByUserPort,
        private readonly teamByUserPort: TeamByUserPort,
    ) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = CreateUserSchema.parse(req.body);
        const user = await this.userService.create(dto);
        res.status(201).json(user);
    }

    async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const user = await this.userService.getById(req.params.id);
        res.status(200).json(user);
    }

    async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UpdateUserSchema.parse(req.body);
        const user = await this.userService.update(req.params.id, dto);
        res.status(200).json(user);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        await this.userService.delete(req.params.id);
        res.status(204).send();
    }
    
    async getProjectsForUser(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const projects = await this.projectByUserPort.getProjectsForUser(req.params.id);
        res.status(200).json(projects);
    }

    async getTasksForUser(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const tasks = await this.taskByUserPort.getTasksForUser(req.params.id);
        res.status(200).json(tasks);
    }

    async getTeamsForUser(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const teams = await this.teamByUserPort.getTeamsForUser(req.params.id);
        res.status(200).json(teams);
    }
}
