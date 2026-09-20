import { Pool, QueryResultRow } from "pg";

// Thin shared helper so concrete repositories don't repeat pool.query
// boilerplate. Deliberately NOT an ORM - every concrete repository
// still writes its own explicit, parameterized SQL.
export abstract class BaseRepository {
  constructor(protected readonly pool: Pool) {}

  protected async query<T extends QueryResultRow>(
    text: string,
    params: unknown[] = []
  ): Promise<T[]> {
    const result = await this.pool.query<T>(text, params);
    return result.rows;
  }
}
