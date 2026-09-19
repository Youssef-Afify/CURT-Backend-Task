import { Task } from "../entities/task";
import { UserTasks } from "../entities/user_tasks";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITaskRepository extends IBaseRepository<Task, string> {
    getAllByProjectId(projectId: string): Promise<Task[]>;
    getAllByUserId(userId: string): Promise<UserTasks>;
}
