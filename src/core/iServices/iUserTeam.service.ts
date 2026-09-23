import { CreateUserTeamDto, DeleteUserTeamDto } from "../dtos/userTeam.dto";
import { UserTeam } from "../entities/userTeam.entity";

export interface IUserTeamService {
    create(dto: CreateUserTeamDto): Promise<UserTeam>;
    delete(dto: DeleteUserTeamDto): Promise<void>;
    isUserTeam(userId: string, teamId: string): Promise<boolean>;
}
