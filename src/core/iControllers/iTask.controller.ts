import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITaskController extends ICrudController {
    getByProjectId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
}