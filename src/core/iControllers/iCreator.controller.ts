import { Request, Response, NextFunction } from "express";

export interface ICreatorController {
    getProjectsForCreator(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTeamsForCreator(req: Request, res: Response, next: NextFunction): Promise<void>;
}