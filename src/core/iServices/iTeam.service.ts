import { CreateTeamDto, UpdateTeamDto } from "../dtos/team.dto";
import { Team } from "../entities/team";
import { ICrudService } from "./base/iCrud.service";

export interface ITeamService extends ICrudService<Team, string, CreateTeamDto, UpdateTeamDto> {
    getAllByUserId(userId: string): Promise<Team[]>;
    getAllByCreatorId(creatorId: string): Promise<Team[]>;
}
