import { UserProject } from "../entities/userProject.entity";

export interface IUserProjectRepository {
    create(data: UserProject): Promise<UserProject>;
    delete(data: UserProject): Promise<boolean>;
    isUserProject(userId: string, projectId: string): Promise<boolean>;
}
