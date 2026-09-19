import { CreateProjectDto, UpdateProjectDto } from "../dtos/project.dto";
import { Project } from "../entities/project";
import { UserProjects } from "../entities/user_projects";
import { ICrudService } from "./base/iCrud.service";

export interface IProjectService extends ICrudService<Project, string, CreateProjectDto, UpdateProjectDto> {
    getAllByUserId(userId: string): Promise<UserProjects>;
    getAllByCreatorId(creatorId: string): Promise<UserProjects>;
}
