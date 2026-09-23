import { Pool } from "pg";
import { ITaskRepository } from "../../core/iRepositories/iTask.repository";
import { BaseRepository } from "./base/base.repository";
import { Task, TaskRow } from "../../core/entities/task.entity";

export class TaskRepository extends BaseRepository implements ITaskRepository {
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: Partial<Task>): Promise<Task> {
        const rows = await this.query<TaskRow>(
            `INSERT INTO tasks (title, description, priority, status, project_id)
            VALUES ($1, $2, $3, 'To Do', $4)
            RETURNING task_id, title, description, priority, status, created_at, updated_at, project_id`,
            [data.title, data.description, data.priority, data.projectId],
        );
        return Task.toEntity(rows[0]);
    }

    async getById(id: string): Promise<Task | null> {
        const rows = await this.query<TaskRow>(
            `SELECT task_id, title, description, priority, status, created_at, updated_at, project_id
            FROM tasks
            WHERE task_id = $1`,
            [id],
        );
        return rows[0] ? Task.toEntity(rows[0]) : null;
    }

    async update(id: string, data: Partial<Task>): Promise<Task | null> {
        const updates: string[] = [];
        const params: unknown[] = [id];

        if (data.title !== undefined) {
            params.push(data.title);
            updates.push(`title = $${params.length}`);
        }

        if (data.description !== undefined) {
            params.push(data.description);
            updates.push(`description = $${params.length}`);
        }

        if (data.priority !== undefined) {
            params.push(data.priority);
            updates.push(`priority = $${params.length}`);
        }

        if (data.status !== undefined) {
            params.push(data.status);
            updates.push(`status = $${params.length}`);
        }

        if (data.projectId !== undefined) {
            params.push(data.projectId);
            updates.push(`project_id = $${params.length}`);
        }

        if (updates.length === 0) return null;

        const rows = await this.query<TaskRow>(
            `UPDATE tasks
            SET ${updates.join(", ")}
            WHERE task_id = $1
            RETURNING task_id, title, description, priority, status, created_at, updated_at, project_id`,
            params,
        );

        return rows[0] ? Task.toEntity(rows[0]) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE from tasks WHERE task_id = $1
            RETURNING true AS deleted`,
            [id],
        );
        return result.length > 0;
    }

    async getAllByProjectId(projectId: string): Promise<Task[]> {
        const rows = await this.query<TaskRow>(
            `SELECT task_id, title, description, priority, status, created_at, updated_at, project_id
            FROM tasks
            WHERE project_id = $1
            ORDER BY created_at DESC`,
            [projectId],
        );

        return Task.toEntities(rows);
    }

    async getAllByUserId(userId: string): Promise<Task[]> {
        const rows = await this.query<TaskRow>(
            `SELECT t.task_id, t.title, t.description, t.priority, t.status, t.created_at, t.updated_at, t.project_id
            FROM tasks t
            INNER JOIN user_tasks ut ON t.task_id = ut.task_id
            WHERE ut.user_id = $1
            ORDER BY t.created_at DESC`,
            [userId],
        );

        return Task.toEntities(rows);
    }
}
