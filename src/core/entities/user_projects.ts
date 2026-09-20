import { Project, ProjectRow } from "./project";

export class UserProjects {
    constructor(
        public readonly userId: string,
        public projects: Project[],
    ) {}

    static toEntity(userId: string, rows: ProjectRow[]): UserProjects {
        return new UserProjects(userId, Project.toEntities(rows));
    }
}
