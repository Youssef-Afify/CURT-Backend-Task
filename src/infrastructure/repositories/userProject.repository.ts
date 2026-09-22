import { Pool } from "pg";
import { IUserProjectRepository } from "../../core/iRepositories/iUserProject.repository";
import { BaseRepository } from "./base/base.repository";
import { UserProject, UserProjectRow } from "../../core/entities/userProject";

export class UserProjectRepository extends BaseRepository implements IUserProjectRepository {
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserProject): Promise<UserProject> {
        const rows = await this.query<UserProjectRow>(
            `INSERT INTO project_members
            VALUES ($1, $2)
            RETURNING user_id, project_id`,
            [data.projectId, data.userId],
        );
        return UserProject.toEntity(rows[0]);
    }

    async delete(data: UserProject): Promise<boolean> {
        const result = await this.query<{ deleted: boolean}>(
            `DELETE FROM project_members
            WHERE project_id = $1 AND user_id = $2
            RETURNING true AS deleted`,
            [data.projectId, data.userId],
        );
        return result.length > 0;
    }
}
