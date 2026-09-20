import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../../core/iControllers/iTask.controller";
import { ITaskService } from "../../core/iServices/iTask.service";
import { CreateTaskSchema, UpdateTaskSchema } from "../../core/dtos/task.dto";

export class TaskController implements ITaskController {
    constructor(private readonly taskService: ITaskService) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = CreateTaskSchema.parse(req.body);
        const task = await this.taskService.create(dto);
        res.status(201).json(task);
    }

    async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const task = await this.taskService.getById(req.params.id);
        res.status(200).json(task);
    }

    async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UpdateTaskSchema.parse(req.body);
        const task = await this.taskService.update(req.params.id, dto);
        res.status(200).json(task);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        await this.taskService.delete(req.params.id);
        res.status(204).send();
    }

    async getAllByUserId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const userTasks = await this.taskService.getAllByUserId(req.params.user_id);
        res.status(200).json(userTasks);
    }

    async getAllByProjectId(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const projectTasks = await this.taskService.getAllByProjectId(req.params.project_id);
        res.status(200).json(projectTasks);
    }
}
