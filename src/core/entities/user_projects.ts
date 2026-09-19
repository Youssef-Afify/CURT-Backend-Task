import { ProjectRow } from "./project";

export interface UserProjectsRow {
    user_id: string;
    projects: ProjectRow[];
}

export class UserProjects {
    constructor(
        public readonly user_id: string,
        public projects: ProjectRow[],
    ) {}

    static toEntity(row: UserProjectsRow): UserProjects {
        return new UserProjects(row.user_id, row.projects);
    }

    static toEntities(rows: UserProjectsRow[]): UserProjects[] {
        return rows.map(UserProjects.toEntity);
    }
}
