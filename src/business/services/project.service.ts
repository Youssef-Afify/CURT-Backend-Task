import { CreateProjectDto, UpdateProjectDto } from "../../core/dtos/project.dto";
import { Project } from "../../core/entities/project";
import { UserProjects } from "../../core/entities/user_projects";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IProjectRepository } from "../../core/iRepositories/iProject.repository";
import { IProjectService } from "../../core/iServices/iProject.service";

export class ProjectService implements IProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateProjectDto): Promise<Project> {
        const project = await this.projectRepository.create({
            name: dto.name,
            description: dto.description,
            // creatorId: creatorId
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
        const deleted = await this.projectRepository.delete(id);
        if (!deleted) {
            this.logger.error(`Project ${id} not found`);
            throw new NotFoundError(`Project ${id} not found`);
        }
    }

    async getAllByUserId(userId: string): Promise<UserProjects> {
        const userProjects = await this.projectRepository.getAllByUserId(userId);
        return userProjects;
    }

    async getAllByCreatorId(creatorId: string): Promise<UserProjects> {
        const creatorProjects = await this.projectRepository.getAllByCreatorId(creatorId);
        return creatorProjects;
    }
}