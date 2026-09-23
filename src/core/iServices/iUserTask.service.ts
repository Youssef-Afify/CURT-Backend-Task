import { CreateUserTaskDto, DeleteUserTaskDto } from "../dtos/userTask.dto";
import { UserTask } from "../entities/userTask.entity";

export interface IUserTaskService {
    create(dto: CreateUserTaskDto): Promise<UserTask>;
    delete(dto: DeleteUserTaskDto): Promise<void>;
}
