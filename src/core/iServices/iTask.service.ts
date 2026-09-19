import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task";
import { UserTasks } from "../entities/user_tasks";
import { ICrudService } from "./base/iCrud.service";

export interface ITaskService extends ICrudService<Task, string, CreateTaskDto, UpdateTaskDto> {
    getAllByUserId(userId: string): Promise<UserTasks>;
    getAllByProjectId(projectId: string): Promise<Task[]>;
}
