import { Task, TaskRow } from "./task";

export class UserTasks {
    constructor(
        public readonly userId: string,
        public tasks: Task[],
    ) {}

    static toEntity(userId: string, rows: TaskRow[]): UserTasks {
        return new UserTasks(userId, Task.toEntities(rows));
    }
}
