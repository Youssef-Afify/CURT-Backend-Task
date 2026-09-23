import { UserTask } from "../entities/userTask.entity";

export interface IUserTaskRepository {
    create(data: UserTask): Promise<UserTask>;
    delete(data: UserTask): Promise<boolean>;
    isUserTask(userId: string, taskId: string): Promise<boolean>;
}
