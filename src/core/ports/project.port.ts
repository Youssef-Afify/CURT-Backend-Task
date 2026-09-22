type Progress = "To Do" | "In Progress" | "Done";

export type ProjectSummary = {
    project_id: string;
    name: string;
    description: string | null;
    progress: Progress;
    created_at: Date;
    updated_at: Date;
    creator_id: string;
}[];

export interface ProjectByUserPort {
    getProjectsForUser(userId: string): Promise<ProjectSummary>;
}

export interface ProjectByCreatorPort {
    getProjectsForCreator(creatorId: string): Promise<ProjectSummary>;
}
