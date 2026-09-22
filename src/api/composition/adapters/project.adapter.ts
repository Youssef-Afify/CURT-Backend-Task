import { ProjectService } from "../../../business/services/project.service";
import {
    ProjectByCreatorPort,
    ProjectByUserPort,
    ProjectSummary,
} from "../../../core/ports/project.port";

export class ProjectForUserAdapter implements ProjectByUserPort {
    constructor(private readonly projectService: ProjectService) {}

    async getProjectsForUser(userId: string): Promise<ProjectSummary> {
        const projects = await this.projectService.getAllByUserId(userId);
        return projects.map((project) => ({
            project_id: project.projectId,
            name: project.name,
            description: project.description,
            progress: project.progress,
            created_at: project.createdAt,
            updated_at: project.updatedAt,
            creator_id: project.creatorId,
        }));
    }
}

export class ProjectForCreatorAdapter implements ProjectByCreatorPort {
    constructor(private readonly projectService: ProjectService) {}

    async getProjectsForCreator(creatorId: string): Promise<ProjectSummary> {
        const projects = await this.projectService.getAllByCreatorId(creatorId);
        return projects.map((project) => ({
            project_id: project.projectId,
            name: project.name,
            description: project.description,
            progress: project.progress,
            created_at: project.createdAt,
            updated_at: project.updatedAt,
            creator_id: project.creatorId,
        }));
    }
}
