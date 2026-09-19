export interface UserRow {
    user_id: string;
    name: string;
    email: string;
    timestamp: Date;
}

export class User {
    constructor(
        public readonly userId: string,
        public name: string,
        public email: string,
        public timestamp: Date,
    ) {}

    static toEntity(row: UserRow): User {
        return new User(row.user_id, row.name, row.email, row.timestamp);
    }

    static toEntities(rows: UserRow[]): User[] {
        return rows.map(User.toEntity);
    }
}
