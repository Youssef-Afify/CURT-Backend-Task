import { Project } from "../entities/project.entity";
import { IBaseRepository } from "./base/iBase.repository";

export interface IProjectRepository extends IBaseRepository<Project, string> {
    getAllByUserId(userId: string): Promise<Project[]>;
    getAllByCreatorId(creatorId: string): Promise<Project[]>;
}
