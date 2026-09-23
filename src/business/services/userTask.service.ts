import {
    CreateUserTaskDto,
    DeleteUserTaskDto,
} from "../../core/dtos/userTask.dto";
import { UserTask } from "../../core/entities/userTask.entity";
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
        const data = new UserTask(dto.userId, dto.taskId);
        const userTask = await this.userTaskRepository.create(data);
        return userTask;
    }

    async delete(dto: DeleteUserTaskDto): Promise<void> {
        const data = new UserTask(dto.userId, dto.taskId);
        const deleted = await this.userTaskRepository.delete(data);
        if (!deleted) {
            this.logger.error(
                `User-Task with userId: ${dto.userId}, TaskId: ${dto.taskId} not found`,
            );
            throw new NotFoundError(
                `User-Task with userId: ${dto.userId}, TaskId: ${dto.taskId} not found`,
            );
        }
    }

    async isUserTask(userId: string, taskId: string): Promise<boolean> {
        const result = await this.userTaskRepository.isUserTask(userId, taskId);
        return result;
    }
}
