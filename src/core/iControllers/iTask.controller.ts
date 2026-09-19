import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITaskController extends ICrudController {
    getAllByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllByProjectId(req: Request, res: Response, next: NextFunction): Promise<void>;
}