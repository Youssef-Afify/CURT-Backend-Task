import { CreateTeamDto, UpdateTeamDto } from "../dtos/team.dto";
import { Team } from "../entities/team";
import { UserTeams } from "../entities/user_teams";
import { ICrudService } from "./base/iCrud.service";

export interface ITeamService extends ICrudService<Team, string, CreateTeamDto, UpdateTeamDto> {
    getByUserId(userId: string): Promise<UserTeams>;
    getByCreatorId(creatorId: string): Promise<UserTeams>;
}
