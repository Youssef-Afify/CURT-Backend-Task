import { CreateTeamDto, UpdateTeamDto } from "../../core/dtos/team.dto";
import { Team } from "../../core/entities/team";
import { UserTeams } from "../../core/entities/user_teams";
import { NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { ITeamRepository } from "../../core/iRepositories/iTeam.repository";
import { ITeamService } from "../../core/iServices/iTeam.service";

export class TeamService implements ITeamService {
    constructor(
        private readonly teamRepository: ITeamRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateTeamDto): Promise<Team> {
        const team = await this.teamRepository.create({
            name: dto.name,
            description: dto.description,
            // creatorId: creatorId
        });
        return team;
    }

    async getById(id: string): Promise<Team> {
        const team = await this.teamRepository.getById(id);
        if (!team) {
            this.logger.error(`Team ${id} not found`);
            throw new NotFoundError(`Team ${id} not found`);
        }
        return team;
    }

    async update(id: string, dto: UpdateTeamDto): Promise<Team> {
        const updated = await this.teamRepository.update(id, {
            name: dto.name,
            description: dto.description,
        });
        if (!updated) {
            this.logger.error(`Team ${id} not found`);
            throw new NotFoundError(`Team ${id} not found`);
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.teamRepository.delete(id);
        if (!deleted) {
            this.logger.error(`Team ${id} not found`);
            throw new NotFoundError(`Team ${id} not found`);
        }
    }

    async getAllByUserId(userId: string): Promise<UserTeams> {
        const userTeams = await this.teamRepository.getAllByUserId(userId);
        return userTeams;
    }

    async getAllByCreatorId(creatorId: string): Promise<Team[]> {
        const creatorTeams = await this.teamRepository.getAllByCreatorId(creatorId);
        return creatorTeams;
    }
}