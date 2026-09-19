import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user";
import { ProjectMembers } from "../entities/project_members";
import { TaskMembers } from "../entities/task_members";
import { TeamMembers } from "../entities/team_members";
import { ICrudService } from "./base/iCrud.service";

export interface IUserService extends ICrudService<User, string, CreateUserDto, UpdateUserDto> {
    getAllByProjectId(projectId: string): Promise<ProjectMembers>;
    getAllByTaskId(taskId: string): Promise<TaskMembers>;
    getAllByTeamId(teamId: string): Promise<TeamMembers>;
}
