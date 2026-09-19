export type Priority = "Low" | "Medium" | "High";
export type Status = "To Do" | "In Progress" | "Done";

export interface TaskRow {
    task_id: string;
    title: string;
    description: string | null;
    priority: Priority;
    status: Status;
    created_at: Date;
    updated_at: Date;
    project_id: string;
}

export class Task {
    constructor(
        public readonly taskId: string,
        public title: string,
        public description: string | null,
        public priority: Priority,
        public status: Status,
        public createdAt: Date,
        public updatedAt: Date,
        public projectId: string,
    ) {}

    static toEntity(row: TaskRow): Task {
        return new Task(
            row.task_id,
            row.title,
            row.description,
            row.priority,
            row.status,
            row.created_at,
            row.updated_at,
            row.project_id,
        );
    }

    static toEntities(rows: TaskRow[]): Task[] {
        return rows.map(Task.toEntity);
    }
}
