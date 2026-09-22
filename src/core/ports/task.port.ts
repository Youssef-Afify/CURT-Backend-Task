type Priority = "Low" | "Medium" | "High";
type Status = "To Do" | "In Progress" | "Done";

export type TaskSummary = {
    task_id: string;
    title: string;
    description: string | null;
    priority: Priority;
    status: Status;
    created_at: Date;
    updated_at: Date;
    project_id: string;
}[];

export interface TaskByUserPort {
    getTasksForUser(userId: string): Promise<TaskSummary>;
}

export interface TaskByProjectPort {
    getTasksForProject(projectId: string): Promise<TaskSummary>;
}
