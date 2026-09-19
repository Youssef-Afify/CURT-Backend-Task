import { Team } from "../entities/team";
import { UserTeams } from "../entities/user_teams";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITeamRepository extends IBaseRepository<Team, string> {
    getAllByUserId(userId: string): Promise<UserTeams>;
    getAllByCreatorId(creatorId: string): Promise<UserTeams>;
}
