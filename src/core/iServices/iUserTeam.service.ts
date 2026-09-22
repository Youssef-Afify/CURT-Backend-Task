import { CreateUserTeamDto, DeleteUserTeamDto } from "../dtos/userTeam.dto";
import { UserTeam } from "../entities/userTeam";

export interface IUserTeamService {
    create(dto: CreateUserTeamDto): Promise<UserTeam>;
    delete(dto: DeleteUserTeamDto): Promise<void>;
}