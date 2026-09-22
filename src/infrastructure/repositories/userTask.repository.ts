import { Pool } from "pg";
import { IUserTaskRepository } from "../../core/iRepositories/iUserTask.repository";
import { BaseRepository } from "./base/base.repository";
import { UserTask, UserTaskRow } from "../../core/entities/userTask";

export class UserTaskRepository extends BaseRepository implements IUserTaskRepository {
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserTask): Promise<UserTask> {
        const rows = await this.query<UserTaskRow>(
            `INSERT INTO task_members
            VALUES ($1, $2)
            RETURNING user_id, task_id`,
            [data.taskId, data.userId],
        );
        return UserTask.toEntity(rows[0]);
    }

    async delete(data: UserTask): Promise<boolean> {
        const result = await this.query<{ deleted: boolean}>(
            `DELETE FROM task_members
            WHERE task_id = $1 AND user_id = $2
            RETURNING true AS deleted`,
            [data.taskId, data.userId],
        );
        return result.length > 0;
    }
}
