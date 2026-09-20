import { User, UserRow } from "./user";

export class ProjectMembers {
    constructor(
        public readonly projectId: string,
        public members: User[],
    ) {}

    static toEntity(projectId: string, rows: UserRow[]): ProjectMembers {
        return new ProjectMembers(projectId, User.toEntities(rows));
    }
}
