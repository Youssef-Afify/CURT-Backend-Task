import { Task } from "../entities/task";
import { UserTasks } from "../entities/user_tasks";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITaskRepositroy extends IBaseRepository<Task, string> {
    getByProjectId(projectId: string): Promise<Task[]>;
    getByUserId(userId: string): Promise<UserTasks>;
}
