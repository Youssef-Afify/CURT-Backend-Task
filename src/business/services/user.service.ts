import { CreateUserDto, UpdateUserDto } from "../../core/dtos/user.dto";
import { User } from "../../core/entities/user";
import { NotFoundError, UnauthorizedError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IUserRepository } from "../../core/iRepositories/iUser.repository";
import { IUserService } from "../../core/iServices/iUser.service";
import { requireCurrentUserId } from "../contextVars/user.context";

export class UserService implements IUserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });
        return user;
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            this.logger.error(`User ${id} not found`);
            throw new NotFoundError(`User ${id} not found`);
        }
        return user;
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const userId = requireCurrentUserId();
        if (userId !== id) {
            throw new UnauthorizedError("Not authorized to update the info of another user");
        }

        const updated = await this.userRepository.update(id, {
            name: dto.name,
        });
        if (!updated) {
            this.logger.error(`User ${id} not found`);
            throw new NotFoundError(`User ${id} not found`);
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const userId = requireCurrentUserId();
        if (userId !== id) {
            throw new UnauthorizedError("Not authorized to delete another user");
        }

        const deleted = await this.userRepository.delete(id);
        if (!deleted) {
            this.logger.error(`User ${id} not found`);
            throw new NotFoundError(`User ${id} not found`);
        }
    }

    async getAllByProjectId(projectId: string): Promise<User[]> {
        const projectMembers = await this.userRepository.getAllByProjectId(projectId);
        return projectMembers;
    }

    async getAllByTaskId(taskId: string): Promise<User[]> {
        const taskMembers = await this.userRepository.getAllByTaskId(taskId);
        return taskMembers;
    }

    async getAllByTeamId(teamId: string): Promise<User[]> {
        const teamMembers = await this.userRepository.getAllByTeamId(teamId);
        return teamMembers;
    }
}