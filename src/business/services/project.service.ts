import { CreateProjectDto, UpdateProjectDto } from "../../core/dtos/project.dto";
import { Project } from "../../core/entities/project.entity";
import { ForbiddenError, NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IProjectRepository } from "../../core/iRepositories/iProject.repository";
import { IProjectService } from "../../core/iServices/iProject.service";
import { requireCurrentUserId } from "../contextVars/user.context";

export class ProjectService implements IProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateProjectDto): Promise<Project> {
        const creatorId = requireCurrentUserId();

        const project = await this.projectRepository.create({
            name: dto.name,
            description: dto.description,
            creatorId: creatorId,
        });
        return project;
    }

    async getById(id: string): Promise<Project> {
        const project = await this.projectRepository.getById(id);
        if (!project) {
            this.logger.error(`Project ${id} not found`);
            throw new NotFoundError(`Project ${id} not found`);
        }
        return project;
    }

    async update(id: string, dto: UpdateProjectDto): Promise<Project> {
        const creatorId = requireCurrentUserId();
        const existing = await this.getById(id);
        if (existing.creatorId !== creatorId) {
            throw new ForbiddenError(
                "Only the project's creator can update it",
            );
        }

        const updated = await this.projectRepository.update(id, {
            name: dto.name,
            description: dto.description,
            progress: dto.progress,
        });
        if (!updated) {
            this.logger.error(`Project ${id} not found`);
            throw new NotFoundError(`Project ${id} not found`);
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const creatorId = requireCurrentUserId();
        const existing = await this.getById(id);
        if (existing.creatorId !== creatorId) {
            throw new ForbiddenError(
                "Only the project's creator can delete it",
            );
        }

        const deleted = await this.projectRepository.delete(id);
        if (!deleted) {
            this.logger.error(`Project ${id} not found`);
            throw new NotFoundError(`Project ${id} not found`);
        }
    }

    async getAllByUserId(userId: string): Promise<Project[]> {
        const currentUserId = requireCurrentUserId();
        if (currentUserId !== userId) {
            throw new ForbiddenError("You can't see projects of another user");
        }
        const userProjects =
            await this.projectRepository.getAllByUserId(userId);
        return userProjects;
    }

    async getAllByCreatorId(creatorId: string): Promise<Project[]> {
        const currentCreatorId = requireCurrentUserId();
        if (currentCreatorId !== creatorId) {
            throw new ForbiddenError("You can't see projects of another creator");
        }
        const creatorProjects =
            await this.projectRepository.getAllByCreatorId(creatorId);
        return creatorProjects;
    }

    async isProjectCreator(projectId: string, userId: string): Promise<boolean> {
        const project = await this.projectRepository.getById(projectId);
        if (!project) {
            this.logger.error(`Project ${projectId} not found`);
            throw new NotFoundError(`Project ${projectId} not found`);
        }
        return project.creatorId == userId;
    }
}
