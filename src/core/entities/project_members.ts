import { UserRow } from "./user";

export interface ProjectMembersRow {
    project_id: string;
    members: UserRow[];
}

export class ProjectMembers {
    constructor(
        public readonly projectId: string,
        public members: UserRow[],
    ) {}

    static toEntity(row: ProjectMembersRow): ProjectMembers {
        return new ProjectMembers(
            row.project_id,
            row.members,
        )
    }

    static toEntities(rows: ProjectMembersRow[]): ProjectMembers[] {
        return rows.map(ProjectMembers.toEntity);
    }
}