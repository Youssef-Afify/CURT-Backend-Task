import { Request, Response, NextFunction } from "express";
import { ICrudController } from "./base/iCrud.controller";

export interface ITeamController extends ICrudController {
    getUsersForTeam(req: Request, res: Response, next: NextFunction): Promise<void>;
}
