import { TaskService } from "../../../business/services/task.service";
import {
    TaskByProjectPort,
    TaskByUserPort,
    TaskSummary,
} from "../../../core/ports/task.port";

export class TaskForProjectAdapter implements TaskByProjectPort {
    constructor(private readonly taskService: TaskService) {}

    async getTasksForProject(projectId: string): Promise<TaskSummary> {
        const tasks = await this.taskService.getAllByProjectId(projectId);
        return tasks.map((task) => ({
            task_id: task.taskId,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            created_at: task.createdAt,
            updated_at: task.updatedAt,
            project_id: task.projectId,
        }));
    }
}

export class TaskForUserAdapter implements TaskByUserPort {
    constructor(private readonly taskService: TaskService) {}

    async getTasksForUser(userId: string): Promise<TaskSummary> {
        const tasks = await this.taskService.getAllByUserId(userId);
        return tasks.map((task) => ({
            task_id: task.taskId,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            created_at: task.createdAt,
            updated_at: task.updatedAt,
            project_id: task.projectId,
        }));
    }
}
