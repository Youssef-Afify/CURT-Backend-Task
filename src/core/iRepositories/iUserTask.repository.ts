import { UserTask } from "../entities/userTask";

export interface IUserTaskRepository {
    create(data: UserTask): Promise<UserTask>;
    delete(data: UserTask): Promise<boolean>;
}