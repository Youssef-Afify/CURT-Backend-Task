import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user";
import { ProjectMembers } from "../entities/project_members";
import { TaskMembers } from "../entities/task_members";
import { TeamMembers } from "../entities/team_members";
import { ICrudService } from "./base/iCrud.service";

export interface IUserService extends ICrudService<User, string, CreateUserDto, UpdateUserDto> {
    getByProjectId(projectId: string): Promise<ProjectMembers>;
    getByTaskId(taskId: string): Promise<TaskMembers>;
    getByTeamId(teamId: string): Promise<TeamMembers>;
}