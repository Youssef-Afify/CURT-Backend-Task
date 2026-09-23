import { Pool } from "pg";
import { IUserTeamRepository } from "../../core/iRepositories/iUserTeam.repository";
import { BaseRepository } from "./base/base.repository";
import { UserTeam, UserTeamRow } from "../../core/entities/userTeam.entity";

export class UserTeamRepository
    extends BaseRepository
    implements IUserTeamRepository
{
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: UserTeam): Promise<UserTeam> {
        const rows = await this.query<UserTeamRow>(
            `INSERT INTO user_teams
            VALUES ($1, $2)
            RETURNING user_id, team_id`,
            [data.userId, data.teamId],
        );
        return UserTeam.toEntity(rows[0]);
    }

    async delete(data: UserTeam): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE FROM user_teams
            WHERE user_id = $1 AND team_id = $2
            RETURNING true AS deleted`,
            [data.userId, data.teamId],
        );
        return result.length > 0;
    }

    async isUserTeam(userId: string, teamId: string): Promise<boolean> {
        const rows = await this.query<UserTeam>(
            `SELECT user_id, team_id FROM user_teams
            WHERE user_id = $1 AND team_id = $2
            RETURNING user_id, team_id`,
            [userId, teamId],
        );
        return rows[0] ? true : false;
    }
}
