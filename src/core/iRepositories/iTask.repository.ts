import { Task } from "../entities/task";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITaskRepository extends IBaseRepository<Task, string> {
    getAllByProjectId(projectId: string): Promise<Task[]>;
    getAllByUserId(userId: string): Promise<Task[]>;
}
