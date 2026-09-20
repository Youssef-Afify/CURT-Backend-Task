import { User, UserRow } from "./user";

export class TeamMembers {
    constructor(
        public readonly teamId: string,
        public members: User[],
    ) {}

    static toEntity(teamId: string, rows: UserRow[]): TeamMembers {
        return new TeamMembers(teamId, User.toEntities(rows));
    }
}
