export interface TeamRow {
    team_id: string;
    name: string;
    description: string | null;
    timestamp: Date;
    creator_id: string;
}

export class Team {
    constructor(
        public readonly teamId: string,
        public name: string,
        public description: string | null,
        public timestamp: Date,
        public creatorId: string,
    ) {}

    static toEntity(row: TeamRow): Team {
        return new Team(
            row.team_id,
            row.name,
            row.description,
            row.timestamp,
            row.creator_id,
        );
    }

    static toEntities(rows: TeamRow[]): Team[] {
        return rows.map(Team.toEntity);
    }
}