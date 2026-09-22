import { ICreateController, IDeleteController } from "./base/iCrud.controller";

export interface IUserTaskController extends ICreateController, IDeleteController {}