import { Request, Response, NextFunction } from "express";
import { IUserTaskController } from "../../core/iControllers/iUserTask.controller";
import { IUserTaskService } from "../../core/iServices/iUserTask.service";
import { UserTaskSchema } from "../../core/dtos/userTask.dto";

export class UserTaskController implements IUserTaskController {
    constructor(
        private readonly userTaskService: IUserTaskService
    ) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserTaskSchema.parse(req.body);
        const userTask = await this.userTaskService.create(dto);
        res.status(201).json(userTask);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserTaskSchema.parse(req.body);
        await this.userTaskService.delete(dto);
        res.status(204).send();
    }
}
