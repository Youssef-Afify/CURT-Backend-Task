import { User } from "../entities/user.entity";
import { IBaseRepository } from "./base/iBase.repository";

export interface IUserRepository extends IBaseRepository<User, string> {
    getAllByProjectId(projectId: string): Promise<User[]>;
    getAllByTaskId(taskId: string): Promise<User[]>;
    getAllByTeamId(teamId: string): Promise<User[]>;
}
