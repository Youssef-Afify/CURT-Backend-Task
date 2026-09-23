import { Pool } from "pg";
import { IUserProjectRepository } from "../../core/iRepositories/iUserProject.repository";
import { BaseRepository } from "./base/base.repository";
import {
    UserProject,
    UserProjectRow,
} from "../../core/entities/userProject.entity";

export class UserProjectRepository
    extends BaseRepository
    implements IUserProjectRepository
{
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserProject): Promise<UserProject> {
        const rows = await this.query<UserProjectRow>(
            `INSERT INTO user_projects
            VALUES ($1, $2)
            RETURNING user_id, project_id`,
            [data.userId, data.projectId],
        );
        return UserProject.toEntity(rows[0]);
    }

    async delete(data: UserProject): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE FROM user_projects
            WHERE user_id = $1 AND project_id = $2
            RETURNING true AS deleted`,
            [data.userId, data.projectId],
        );
        return result.length > 0;
    }
}
