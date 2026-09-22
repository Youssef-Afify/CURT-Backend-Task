import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface IProjectController extends ICrudController {
    getUsersForProject(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTasksForProject(req: Request, res: Response, next: NextFunction): Promise<void>;
}
