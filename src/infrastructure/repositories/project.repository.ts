import { Pool } from "pg";
import { IProjectRepository } from "../../core/iRepositories/iProject.repository";
import { BaseRepository } from "./base/base.repository";
import { Project, ProjectRow } from "../../core/entities/project";
import { UserProjects } from "../../core/entities/user_projects";

export class ProjectRepository
    extends BaseRepository
    implements IProjectRepository
{
    constructor(pool: Pool) {
        super(pool);
    }

    async create(data: Partial<Project>): Promise<Project> {
        const rows = await this.query<ProjectRow>(
            `INSERT INTO projects (name, description, progress, creator_id)
            VALUES ($1, $2, 'To Do', $3)
            RETURNING project_id, name, description, progress, created_at, updated_at, creator_id`,
            [data.name, data.description, data.creatorId],
        );
        return Project.toEntity(rows[0]);
    }

    async getById(id: string): Promise<Project | null> {
        const rows = await this.query<ProjectRow>(
            `SELECT project_id, name, description, progress, created_at, updated_at, creator_id
            FROM projects
            WHERE project_id = $1`,
            [id],
        );
        return rows[0] ? Project.toEntity(rows[0]) : null;
    }

    async update(id: string, data: Partial<Project>): Promise<Project | null> {
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

        if (data.progress !== undefined) {
            params.push(data.progress);
            updates.push(`progress = $${params.length}`);
        }

        if (updates.length === 0) return null;

        const rows = await this.query<ProjectRow>(
            `UPDATE projects
            SET ${updates.join(", ")}
            WHERE project_id = $1
            RETURNING project_id, name, description, progress, created_at, updated_at, creator_id`,
            params,
        );

        return rows[0] ? Project.toEntity(rows[0]) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.query<{ deleted: boolean }>(
            `DELETE FROM projects WHERE project_id = $1
            RETURNING true AS deleted`,
            [id],
        );
        return result.length > 0;
    }

    async getAllByUserId(userId: string): Promise<UserProjects> {
        const rows = await this.query<ProjectRow>(
            `SELECT p.project_id, p.name, p.description, p.progress, p.created_at, p.updated_at, p.creator_id
            FROM projects p
            INNER JOIN project_members pm ON p.project_id = pm.project_id
            WHERE pm.user_id = $1
            ORDER BY p.created_at DESC`,
            [userId],
        );

        return new UserProjects(userId, Project.toEntities(rows));
    }

    async getAllByCreatorId(creatorId: string): Promise<Project[]> {
        const rows = await this.query<ProjectRow>(
            `SELECT project_id, name, description, progress, created_at, updated_at, creator_id
            FROM projects
            WHERE creator_id = $1
            ORDER BY created_at DESC`,
            [creatorId],
        );

        return Project.toEntities(rows);
    }
}
