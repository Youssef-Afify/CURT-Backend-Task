import { CreateTaskDto, UpdateTaskDto } from "../../core/dtos/task.dto";
import { Task } from "../../core/entities/task.entity";
import { ForbiddenError, NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { ITaskRepository } from "../../core/iRepositories/iTask.repository";
import { ITaskService } from "../../core/iServices/iTask.service";
import { IsProjectCreatorPort } from "../../core/ports/task.port";
import { IsUserProjectPort } from "../../core/ports/userProject.port";
import { IsUserTaskPort } from "../../core/ports/userTask.port";
import { requireCurrentUserId } from "../contextVars/user.context";

export class TaskService implements ITaskService {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly isProjectCreatorPort: IsProjectCreatorPort,
        private readonly isUserTaskPort: IsUserTaskPort,
        private readonly isUserProjectPort: IsUserProjectPort,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        const userId = requireCurrentUserId();
        const isProjectCreator = await this.isProjectCreatorPort.isProjectCreator(dto.projectId, userId);
        if (!isProjectCreator) {
            this.logger.error("Only project's creator can add tasks")
            throw new ForbiddenError("Only project's creator can add tasks");
        }

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
        const userId = requireCurrentUserId();
        const isTaskMember = await this.isUserTaskPort.isUserTask(userId, id);
        if (!isTaskMember) {
            this.logger.error("Only members of a task can edit it");
            throw new ForbiddenError("Only members of a task can edit it");
        }

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
        const task = await this.taskRepository.getById(id);
        if (!task) {
            this.logger.error(`Task ${id} not found`);
            throw new NotFoundError(`Task ${id} not found`);
        }

        const userId = requireCurrentUserId();
        const isCreator = await this.isProjectCreatorPort.isProjectCreator(task.projectId, userId);
        if (!isCreator) {
            this.logger.error("Only project's creator can delete tasks")
            throw new ForbiddenError("Only project's creator can delete tasks");
        }

        const deleted = await this.taskRepository.delete(id);
        if (!deleted) {
            this.logger.error(`Task ${id} not found`);
            throw new NotFoundError(`Task ${id} not found`);
        }
    }

    async getAllByUserId(userId: string): Promise<Task[]> {
        const currentUserId = requireCurrentUserId();
        if (currentUserId !== userId) {
            throw new ForbiddenError("You can't see tasks of another user");
        }

        const userTasks = await this.taskRepository.getAllByUserId(userId);
        return userTasks;
    }

    async getAllByProjectId(projectId: string): Promise<Task[]> {
        const userId = requireCurrentUserId();
        const isProjectMember = await this.isUserProjectPort.isUserProject(userId, projectId);
        if (!isProjectMember) {
            this.logger.error("Only members of a project can see its tasks");
            throw new ForbiddenError("Only members of a project can see its tasks");
        }

        const projectTasks =
            await this.taskRepository.getAllByProjectId(projectId);
        return projectTasks;
    }
}
