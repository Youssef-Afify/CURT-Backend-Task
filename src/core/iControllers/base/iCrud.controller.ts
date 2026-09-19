import { Request, Response, NextFunction } from "express";

export interface ICreateController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IReadController {
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IUpdateController {
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IDeleteController {
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface ICrudController extends ICreateController, IReadController, IUpdateController, IDeleteController {}

export interface IGetAllController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
