import { UserTeam } from "../entities/userTeam";

export interface IUserTeamRepository {
    create(data: UserTeam): Promise<UserTeam>;
    delete(data: UserTeam): Promise<boolean>;
}