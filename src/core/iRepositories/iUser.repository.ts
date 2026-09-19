import { User } from "../entities/user";
import { ProjectMembers } from "../entities/project_members";
import { TaskMembers } from "../entities/task_members";
import { TeamMembers } from "../entities/team_members";
import { IBaseRepository } from "./base/iBase.repository";

export interface IUserRepository extends IBaseRepository<User, string> {
    getAllByProjectId(projectId: string): Promise<ProjectMembers>;
    getAllByTaskId(taskId: string): Promise<TaskMembers>;
    getAllByTeamId(teamId: string): Promise<TeamMembers>;
}
