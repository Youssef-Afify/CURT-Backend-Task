import { Team } from "../entities/team";
import { IBaseRepository } from "./base/iBase.repository";

export interface ITeamRepository extends IBaseRepository<Team, string> {
    getAllByUserId(userId: string): Promise<Team[]>;
    getAllByCreatorId(creatorId: string): Promise<Team[]>;
}
