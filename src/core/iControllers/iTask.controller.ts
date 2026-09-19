import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITaskController extends ICrudController {
    getByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByProjectId(req: Request, res: Response, next: NextFunction): Promise<void>;
}