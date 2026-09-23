import { CreateTaskDto, UpdateTaskDto } from "../../core/dtos/task.dto";
import { Task } from "../../core/entities/task.entity";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { ITaskRepository } from "../../core/iRepositories/iTask.repository";
import { ITaskService } from "../../core/iServices/iTask.service";

export class TaskService implements ITaskService {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.create({
            title: dto.title,
            description: dto.description,
            priority: dto.priority,
            projectId: dto.projectId,
        });
        return task;
    }

    async getById(id: string): Promise<Task> {
        const task = await this.taskRepository.getById(id);
        if (!task) {
            this.logger.error(`Task ${id} not found`);
            throw new NotFoundError(`Task ${id} not found`);
        }
        return task;
    }

    async update(id: string, dto: UpdateTaskDto): Promise<Task> {
        const updated = await this.taskRepository.update(id, {
            title: dto.title,
            description: dto.description,
            priority: dto.priority,
            status: dto.status,
            projectId: dto.projectId,
        });
        if (!updated) {
            this.logger.error(`Task ${id} not found`);
            throw new NotFoundError(`Task ${id} not found`);
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.taskRepository.delete(id);
        if (!deleted) {
            this.logger.error(`Task ${id} not found`);
            throw new NotFoundError(`Task ${id} not found`);
        }
    }

    async getAllByUserId(userId: string): Promise<Task[]> {
        const userTasks = await this.taskRepository.getAllByUserId(userId);
        return userTasks;
    }

    async getAllByProjectId(projectId: string): Promise<Task[]> {
        const projectTasks =
            await this.taskRepository.getAllByProjectId(projectId);
        return projectTasks;
    }
}
