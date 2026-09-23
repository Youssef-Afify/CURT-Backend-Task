export type Progress = "To Do" | "In Progress" | "Done";

export interface ProjectRow {
    project_id: string;
    name: string;
    description: string | null;
    progress: Progress;
    created_at: Date;
    updated_at: Date;
    creator_id: string;
}

export class Project {
    constructor(
        public readonly projectId: string,
        public name: string,
        public description: string | null,
        public progress: Progress,
        public createdAt: Date,
        public updatedAt: Date,
        public creatorId: string,
    ) {}

    static toEntity(row: ProjectRow): Project {
        return new Project(
            row.project_id,
            row.name,
            row.description,
            row.progress,
            row.created_at,
            row.updated_at,
            row.creator_id,
        );
    }

    static toEntities(rows: ProjectRow[]): Project[] {
        return rows.map(Project.toEntity);
    }
}
