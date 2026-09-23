import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task.entity";
import { ICrudService } from "./base/iCrud.service";

export interface ITaskService extends ICrudService<
    Task,
    string,
    CreateTaskDto,
    UpdateTaskDto
> {
    getAllByUserId(userId: string): Promise<Task[]>;
    getAllByProjectId(projectId: string): Promise<Task[]>;
}
