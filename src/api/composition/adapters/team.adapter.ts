import { TeamService } from "../../../business/services/team.service";
import {
    TeamByCreatorPort,
    TeamByUserPort,
    TeamSummary,
} from "../../../core/ports/team.port";

export class TeamForUserAdapter implements TeamByUserPort {
    constructor(private readonly teamService: TeamService) {}

    async getTeamsForUser(userId: string): Promise<TeamSummary> {
        const teams = await this.teamService.getAllByUserId(userId);
        return teams.map((team) => ({
            team_id: team.teamId,
            name: team.name,
            description: team.description,
            timestamp: team.timestamp,
            creator_id: team.creatorId,
        }));
    }
}

export class TeamForCreatorAdapter implements TeamByCreatorPort {
    constructor(private readonly teamService: TeamService) {}

    async getTeamsForCreator(creatorId: string): Promise<TeamSummary> {
        const teams = await this.teamService.getAllByCreatorId(creatorId);
        return teams.map((team) => ({
            team_id: team.teamId,
            name: team.name,
            description: team.description,
            timestamp: team.timestamp,
            creator_id: team.creatorId,
        }));
    }
}
