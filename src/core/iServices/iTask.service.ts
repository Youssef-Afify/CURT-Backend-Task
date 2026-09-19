import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task";
import { UserTasks } from "../entities/user_tasks";
import { ICrudService } from "./base/iCrud.service";

export interface ITaskService extends ICrudService<Task, string, CreateTaskDto, UpdateTaskDto> {
    getByUserId(userId: string): Promise<UserTasks>;
    getByProjectId(projectId: string): Promise<Task[]>;
}
