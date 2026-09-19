import { User } from "../entities/user";
import { ProjectMembers } from "../entities/project_members";
import { TaskMembers } from "../entities/task_members";
import { TeamMembers } from "../entities/team_members";
import { IBaseRepository } from "./base/iBase.repository";

export interface IUserRepository extends IBaseRepository<User, string> {
    getByProjectId(projectId: string): Promise<ProjectMembers>;
    getByTaskId(taskId: string): Promise<TaskMembers>;
    getByTeamId(teamId: string): Promise<TeamMembers>;
}