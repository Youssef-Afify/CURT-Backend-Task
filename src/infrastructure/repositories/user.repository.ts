import { Pool } from "pg";
import { IUserRepository } from "../../core/iRepositories/iUser.repository";
import { BaseRepository } from "./base/base.repository";
import { User, UserRow } from "../../core/entities/user";
import { ProjectMembers } from "../../core/entities/project_members";
import { TaskMembers } from "../../core/entities/task_members";
import { TeamMembers } from "../../core/entities/team_members";

export class UserRepository extends BaseRepository implements IUserRepository {
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: Partial<User>): Promise<User> {
        const rows = await this.query<UserRow>(
            `INSERT INTO users (user_id, name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, name, email, password, "timestamp"`,
            [data.userId, data.name, data.email, data.password],
        );
        return User.toEntity(rows[0]);
    }

    async getById(id: string): Promise<User | null> {
        const rows = await this.query<UserRow>(
            `SELECT user_id, name, email, password, "timestamp"
            FROM users
            WHERE user_id = $1`,
            [id],
        );
        return rows[0] ? User.toEntity(rows[0]) : null;
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        const updates: string[] = [];
        const params: unknown[] = [id];

        if (data.name !== undefined) {
            params.push(data.name);
            updates.push(`name = $${params.length}`);
        }

        if (updates.length === 0) return null;

        const rows = await this.query<UserRow>(
            `UPDATE users
            SET ${updates.join(", ")}
            WHERE user_id = $1
            RETURNING user_id, name, email, password, "timestamp"`,
            params,
        );

        return rows[0] ? User.toEntity(rows[0]) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.query<{ deleted: true }>(
            `DELETE FROM users WHERE user_id = $1
            RETURNING true AS deleted`,
            [id],
        );

        return result.length > 0;
    }

    async getAllByProjectId(projectId: string): Promise<ProjectMembers> {
        const rows = await this.query<UserRow>(
            `SELECT u.user_id, u.name, u.email, u.password, u."timestamp"
            FROM users u
            INNER JOIN project_members pm ON u.user_id = pm.user_id
            WHERE project_id = $1
            ORDER BY "timestamp" DESC`,
            [projectId],
        );

        return new ProjectMembers(projectId, User.toEntities(rows));
    }

    async getAllByTaskId(taskId: string): Promise<TaskMembers> {
        const rows = await this.query<UserRow>(
            `SELECT u.user_id, u.name, u.email, u.password, u."timestamp"
            FROM users u
            INNER JOIN task_members tm ON u.user_id = tm.user_id
            WHERE task_id = $1
            ORDER BY "timestamp" DESC`,
            [taskId],
        );

        return new TaskMembers(taskId, User.toEntities(rows));
    }

    async getAllByTeamId(teamId: string): Promise<TeamMembers> {
        const rows = await this.query<UserRow>(
            `SELECT u.user_id, u.name, u.email, u.password, u."timestamp"
            FROM users u
            INNER JOIN team_members tm ON u.user_id = tm.user_id
            WHERE team_id = $1
            ORDER BY "timestamp" DESC`,
            [teamId],
        );

        return new TeamMembers(teamId, User.toEntities(rows));
    }
}
