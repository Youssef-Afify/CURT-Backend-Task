import { CreateUserTeamDto, DeleteUserTeamDto } from "../../core/dtos/userTeam.dto";
import { UserTeam } from "../../core/entities/userTeam";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { IUserTeamRepository } from "../../core/iRepositories/iUserTeam.repository";
import { IUserTeamService } from "../../core/iServices/iUserTeam.service";

export class UserTeamService implements IUserTeamService {
    constructor(
        private readonly userTeamRepository: IUserTeamRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateUserTeamDto): Promise<UserTeam> {
        const data = new UserTeam(dto.userId, dto.teamId);
        const userTeam = await this.userTeamRepository.create(data);
        return userTeam;
    }

    async delete(dto: DeleteUserTeamDto): Promise<void> {
        const data = new UserTeam(dto.userId, dto.teamId);
        const deleted = await this.userTeamRepository.delete(data);
        if (!deleted) {
            this.logger.error(`User-Team with userId: ${dto.userId}, TeamId: ${dto.teamId} not found`);
            throw new NotFoundError(`User-Team with userId: ${dto.userId}, TeamId: ${dto.teamId} not found`);
        }
    }
}
