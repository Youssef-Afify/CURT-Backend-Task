import { UserRow } from "./user";

export interface TaskMembersRow {
    task_id: string;
    members: UserRow[];
}

export class TaskMembers {
    constructor(
        public readonly taskId: string,
        public members: UserRow[],
    ) {}

    static toEntity(row: TaskMembersRow): TaskMembers {
        return new TaskMembers(row.task_id, row.members);
    }

    static toEntities(rows: TaskMembersRow[]): TaskMembers[] {
        return rows.map(TaskMembers.toEntity);
    }
}
