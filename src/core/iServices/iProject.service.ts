import { CreateProjectDto, UpdateProjectDto } from "../dtos/project.dto";
import { Project } from "../entities/project.entity";
import { ICrudService } from "./base/iCrud.service";

export interface IProjectService extends ICrudService<
    Project,
    string,
    CreateProjectDto,
    UpdateProjectDto
> {
    getAllByUserId(userId: string): Promise<Project[]>;
    getAllByCreatorId(creatorId: string): Promise<Project[]>;
}
