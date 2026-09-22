export interface UserTaskRow {
    user_id: string;
    task_id: string;
}

export class UserTask {
    constructor(
        public readonly userId: string,
        public readonly taskId: string,
    ) {}

    static toEntity(row: UserTaskRow): UserTask {
        return new UserTask(
            row.user_id,
            row.task_id,
        );
    }

    static toEntities(rows: UserTaskRow[]): UserTask[] {
        return rows.map(UserTask.toEntity);
    }
}