export interface UserProjectRow {
    user_id: string;
    project_id: string;
}

export class UserProject {
    constructor(
        public readonly userId: string,
        public readonly projectId: string,
    ) {}

    static toEntity(row: UserProjectRow): UserProject {
        return new UserProject(
            row.user_id,
            row.project_id,
        );
    }

    static toEntities(rows: UserProjectRow[]): UserProject[] {
        return rows.map(UserProject.toEntity);
    }
}