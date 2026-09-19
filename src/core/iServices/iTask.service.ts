import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task";
import { UserTasks } from "../entities/user_tasks";
import { ICrudService } from "./base/iCrud.service";

export interface ITaskService extends ICrudService<Task, string, CreateTaskDto, UpdateTaskDto> {
    getByProjectId(projectId: string): Promise<Task[]>;
    getByUserId(userId: string): Promise<UserTasks>;
}