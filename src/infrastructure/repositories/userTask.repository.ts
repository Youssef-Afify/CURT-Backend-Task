import { Pool } from "pg";
import { IUserTaskRepository } from "../../core/iRepositories/iUserTask.repository";
import { BaseRepository } from "./base/base.repository";
import { UserTask, UserTaskRow } from "../../core/entities/userTask.entity";

export class UserTaskRepository
    extends BaseRepository
    implements IUserTaskRepository
{
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserTask): Promise<UserTask> {
        const rows = await this.query<UserTaskRow>(
            `INSERT INTO user_tasks
            VALUES ($1, $2)
            RETURNING user_id, task_id`,
            [data.userId, data.taskId],
        );
        return UserTask.toEntity(rows[0]);
    }

    async delete(data: UserTask): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE FROM user_tasks
            WHERE user_id = $1 AND task_id = $2
            RETURNING true AS deleted`,
            [data.userId, data.taskId],
        );
        return result.length > 0;
    }
}
