import { Pool } from "pg";
import { IUserTeamRepository } from "../../core/iRepositories/iUserTeam.repository";
import { BaseRepository } from "./base/base.repository";
import { UserTeam, UserTeamRow } from "../../core/entities/userTeam";

export class UserTeamRepository extends BaseRepository implements IUserTeamRepository {
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserTeam): Promise<UserTeam> {
        const rows = await this.query<UserTeamRow>(
            `INSERT INTO team_members
            VALUES ($1, $2)
            RETURNING user_id, team_id`,
            [data.teamId, data.userId],
        );
        return UserTeam.toEntity(rows[0]);
    }

    async delete(data: UserTeam): Promise<boolean> {
        const result = await this.query<{ deleted: boolean}>(
            `DELETE FROM team_members
            WHERE team_id = $1 AND user_id = $2
            RETURNING true AS deleted`,
            [data.teamId, data.userId],
        );
        return result.length > 0;
    }
}
