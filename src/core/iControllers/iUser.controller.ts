import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface IUserController extends ICrudController {
    getByProjectId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByTaskId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByTeamId(req: Request, res: Response, next: NextFunction): Promise<void>;
}