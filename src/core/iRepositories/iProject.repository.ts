import { Project } from "../entities/project";
import { UserProjects } from "../entities/user_projects";
import { IBaseRepository } from "./base/iBase.repository";

export interface IProjectRepository extends IBaseRepository<Project, string> {
    getByUserId(userId: string): Promise<UserProjects>;
    getByCreatorId(creatorId: string): Promise<UserProjects>;
}
