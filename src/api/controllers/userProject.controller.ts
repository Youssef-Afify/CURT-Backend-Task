import { Request, Response, NextFunction } from "express";
import { IUserProjectController } from "../../core/iControllers/iUserProject.controller";
import { IUserProjectService } from "../../core/iServices/iUserProject.service";
import { UserProjectSchema } from "../../core/dtos/userProject.dto";

export class UserProjectController implements IUserProjectController {
    constructor(
        private readonly userProjectService: IUserProjectService
    ) {}

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserProjectSchema.parse(req.body);
        const userProject = await this.userProjectService.create(dto);
        res.status(201).json(userProject);
    }

    async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const dto = UserProjectSchema.parse(req.body);
        await this.userProjectService.delete(dto);
        res.status(204).send();
    }
}
