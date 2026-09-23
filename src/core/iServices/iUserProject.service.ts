import {
    CreateUserProjectDto,
    DeleteUserProjectDto,
} from "../dtos/userProject.dto";
import { UserProject } from "../entities/userProject.entity";

export interface IUserProjectService {
    create(dto: CreateUserProjectDto): Promise<UserProject>;
    delete(dto: DeleteUserProjectDto): Promise<void>;
    isUserProject(userId: string, projectId: string): Promise<boolean>;
}
