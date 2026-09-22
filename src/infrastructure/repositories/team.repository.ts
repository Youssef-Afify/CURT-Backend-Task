import { Pool } from "pg";
import { ITeamRepository } from "../../core/iRepositories/iTeam.repository";
import { BaseRepository } from "./base/base.repository";
import { Team, TeamRow } from "../../core/entities/team";

export class TeamRepository
    extends BaseRepository
    implements ITeamRepository
{
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: Partial<Team>): Promise<Team> {
        const rows = await this.query<TeamRow>(
            `INSERT INTO teams (name, description, creator_id)
            VALUES ($1, $2, $3)
            RETURNING team_id, name, description, "timestamp", creator_id`,
            [data.name, data.description, data.creatorId],
        );
        return Team.toEntity(rows[0]);
    }

    async getById(id: string): Promise<Team | null> {
        const rows = await this.query<TeamRow>(
            `SELECT team_id, name, description, "timestamp", creator_id
            FROM teams
            WHERE team_id = $1`,
            [id],
        );
        return rows[0] ? Team.toEntity(rows[0]) : null;
    }

    async update(id: string, data: Partial<Team>): Promise<Team | null> {
        const updates: string[] = [];
        const params: unknown[] = [id];

        if (data.name !== undefined) {
            params.push(data.name);
            updates.push(`name = $${params.length}`);
        }

        if (data.description !== undefined) {
            params.push(data.description);
            updates.push(`description = $${params.length}`);
        }

        if (updates.length === 0) return null;

        const rows = await this.query<TeamRow>(
            `UPDATE teams
            SET ${updates.join(", ")}
            WHERE team_id = $1
            RETURNING team_id, name, description, "timestamp", creator_id`,
            params,
        );

        return rows[0] ? Team.toEntity(rows[0]) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE FROM teams WHERE team_id = $1
            RETURNING true AS deleted`,
            [id],
        );
        return result.length > 0;
    }

    async getAllByUserId(userId: string): Promise<Team[]> {
        const rows = await this.query<TeamRow>(
            `SELECT t.team_id, t.name, t.description, t."timestamp", t.creator_id
            FROM teams t
            INNER JOIN team_members tm ON t.team_id = tm.team_id
            WHERE tm.user_id = $1
            ORDER BY t."timestamp" DESC`,
            [userId],
        );

        return Team.toEntities(rows);
    }

    async getAllByCreatorId(creatorId: string): Promise<Team[]> {
        const rows = await this.query<TeamRow>(
            `SELECT team_id, name, description, "timestamp", creator_id
            FROM teams
            WHERE creator_id = $1
            ORDER BY "timestamp" DESC`,
            [creatorId],
        );

        return Team.toEntities(rows);
    }
}
