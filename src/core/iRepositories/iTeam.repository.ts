import { Team } from "../entities/team";
import { UserTeams } from "../entities/user_teams";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITeamRepository extends IBaseRepository<Team, string> {
    getByUserId(userId: string): Promise<UserTeams>;
    getByCreatorId(creatorId: string): Promise<UserTeams>;
}
