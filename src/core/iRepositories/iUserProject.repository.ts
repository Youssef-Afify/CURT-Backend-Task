import { UserProject } from "../entities/userProject";

export interface IUserProjectRepository {
    create(data: UserProject): Promise<UserProject>;
    delete(data: UserProject): Promise<boolean>;
}