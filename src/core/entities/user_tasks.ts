import { TaskRow } from "./task";

export interface UserTasksRow {
    user_id: string;
    tasks: TaskRow[];
}

export class UserTasks {
    constructor(
        public readonly userId: string,
        public tasks: TaskRow[],
    ) {}

    static toEntity(row: UserTasksRow): UserTasks {
        return new UserTasks(row.user_id, row.tasks);
    }

    static toEntities(rows: UserTasksRow[]): UserTasks[] {
        return rows.map(UserTasks.toEntity);
    }
}
