import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface IUserController extends ICrudController {
    getProjectsForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTasksForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTeamsForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
