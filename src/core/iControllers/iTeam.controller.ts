import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITeamController extends ICrudController {
    getByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByCreatorId(req: Request, res: Response, next: NextFunction): Promise<void>;
}