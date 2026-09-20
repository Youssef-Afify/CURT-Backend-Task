import { CreateTeamDto, UpdateTeamDto } from "../dtos/team.dto";
import { Team } from "../entities/team";
import { UserTeams } from "../entities/user_teams";
import { ICrudService } from "./base/iCrud.service";

export interface ITeamService extends ICrudService<Team, string, CreateTeamDto, UpdateTeamDto> {
    getAllByUserId(userId: string): Promise<UserTeams>;
    getAllByCreatorId(creatorId: string): Promise<Team[]>;
}
