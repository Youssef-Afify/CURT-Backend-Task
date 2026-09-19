import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface IUserController extends ICrudController {
    getAllByProjectId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllByTaskId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllByTeamId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
