import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface IProjectController extends ICrudController {
    getAllByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllByCreatorId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
