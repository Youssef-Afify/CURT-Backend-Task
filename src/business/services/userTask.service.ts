import { CreateUserTaskDto, DeleteUserTaskDto } from "../../core/dtos/userTask.dto";
import { UserTask } from "../../core/entities/userTask";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IUserTaskRepository } from "../../core/iRepositories/iUserTask.repository";
import { IUserTaskService } from "../../core/iServices/iUserTask.service";

export class UserTaskService implements IUserTaskService {
    constructor(
        private readonly userTaskRepository: IUserTaskRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateUserTaskDto): Promise<UserTask> {
        const userTask = await this.userTaskRepository.create(dto);
        return userTask;
    }

    async delete(dto: DeleteUserTaskDto): Promise<void> {
        const deleted = await this.userTaskRepository.delete(dto);
        if (!deleted) {
            this.logger.error(`User-Task with userId: ${dto.userId}, TaskId: ${dto.taskId} not found`);
            throw new NotFoundError(`User-Task with userId: ${dto.userId}, TaskId: ${dto.taskId} not found`);
        }
    }
}
