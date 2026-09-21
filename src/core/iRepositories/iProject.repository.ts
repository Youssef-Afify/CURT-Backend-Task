import { Project } from "../entities/project";
import { UserProjects } from "../entities/user_projects";
import { IBaseRepository } from "./base/iBase.repository";

export interface IProjectRepository extends IBaseRepository<Project, string> {
    getAllByUserId(userId: string): Promise<UserProjects>;
    getAllByCreatorId(creatorId: string): Promise<Project[]>;
}
