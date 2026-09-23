import { UserTeam } from "../entities/userTeam.entity";

export interface IUserTeamRepository {
    create(data: UserTeam): Promise<UserTeam>;
    delete(data: UserTeam): Promise<boolean>;
    isUserTeam(userId: string, teamId: string): Promise<boolean>;
}
