import {
    CreateUserProjectDto,
    DeleteUserProjectDto,
} from "../../core/dtos/userProject.dto";
import { UserProject } from "../../core/entities/userProject.entity";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IUserProjectRepository } from "../../core/iRepositories/iUserProject.repository";
import { IUserProjectService } from "../../core/iServices/iUserProject.service";

export class UserProjectService implements IUserProjectService {
    constructor(
        private readonly userProjectRepository: IUserProjectRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateUserProjectDto): Promise<UserProject> {
        const data = new UserProject(dto.userId, dto.projectId);
        const userProject = await this.userProjectRepository.create(data);
        return userProject;
    }

    async delete(dto: DeleteUserProjectDto): Promise<void> {
        const data = new UserProject(dto.userId, dto.projectId);
        const deleted = await this.userProjectRepository.delete(data);
        if (!deleted) {
            this.logger.error(
                `User-Project with userId: ${dto.userId}, projectId: ${dto.projectId} not found`,
            );
            throw new NotFoundError(
                `User-Project with userId: ${dto.userId}, projectId: ${dto.projectId} not found`,
            );
        }
    }

    async isUserProject(userId: string, projectId: string): Promise<boolean> {
        const result = await this.userProjectRepository.isUserProject(userId, projectId);
        return result;
    }
}
