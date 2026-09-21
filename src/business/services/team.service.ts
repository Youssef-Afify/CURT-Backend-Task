import { CreateTeamDto, UpdateTeamDto } from "../../core/dtos/team.dto";
import { Team } from "../../core/entities/team";
import { UserTeams } from "../../core/entities/user_teams";
import { ForbiddenError, NotFoundError } from "../../core/errors/appError";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";
import { ITeamRepository } from "../../core/iRepositories/iTeam.repository";
import { ITeamService } from "../../core/iServices/iTeam.service";
import { requireCurrentUserId } from "../contextVars/user.context";

export class TeamService implements ITeamService {
    constructor(
        private readonly teamRepository: ITeamRepository,
        private readonly logger: IBaseLogger,
    ) {}

    async create(dto: CreateTeamDto): Promise<Team> {
        const creatorId = requireCurrentUserId();

        const team = await this.teamRepository.create({
            name: dto.name,
            description: dto.description,
            creatorId: creatorId,
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
        const creatorId = requireCurrentUserId();
        const existing = await this.getById(id);
        if (existing.creatorId !== creatorId) {
            throw new ForbiddenError("Only the team's creator can update it");
        }

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
        const creatorId = requireCurrentUserId();
        const existing = await this.getById(id);
        if (existing.creatorId !== creatorId) {
            throw new ForbiddenError("Only the team's creator can delete it");
        }

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