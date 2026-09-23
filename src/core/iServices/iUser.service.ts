import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { ICrudService } from "./base/iCrud.service";

export interface IUserService extends ICrudService<
    User,
    string,
    CreateUserDto,
    UpdateUserDto
> {
    getAllByProjectId(projectId: string): Promise<User[]>;
    getAllByTaskId(taskId: string): Promise<User[]>;
    getAllByTeamId(teamId: string): Promise<User[]>;
}
