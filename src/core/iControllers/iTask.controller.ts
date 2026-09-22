import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITaskController extends ICrudController {
    getUsersForTask(req: Request, res: Response, next: NextFunction): Promise<void>;
}