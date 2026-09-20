import { User, UserRow } from "./user";

export class TaskMembers {
    constructor(
        public readonly taskId: string,
        public members: User[],
    ) {}

    static toEntity(taskId: string, rows: UserRow[]): TaskMembers {
        return new TaskMembers(taskId, User.toEntities(rows));
    }
}
