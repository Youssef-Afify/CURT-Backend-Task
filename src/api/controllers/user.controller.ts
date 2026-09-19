import { Request, Response, NextFunction } from "express";
import { IUserController } from "../../core/iControllers/iUser.controller";
import { IUserService } from "../../core/iServices/iUser.service";
import { CreateUserSchema, UpdateUserSchema } from "../../core/dtos/user.dto";

export class UserController implements IUserController {
    constructor(private readonly userService: IUserService) {}

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

    async getByProjectId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const projectMembers = await this.userService.getByProjectId(req.params.id);
        res.status(200).json(projectMembers);
    }

    async getByTaskId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const taskMembers = await this.userService.getByTaskId(req.params.id);
        res.status(200).json(taskMembers);
    }

    async getByTeamId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const teamMembers = await this.userService.getByTeamId(req.params.id);
        res.status(200).json(teamMembers);
    }
}
