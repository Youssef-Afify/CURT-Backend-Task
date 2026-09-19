import { Pool } from "pg";

// One pool for the whole app's lifetime - reused across every request,
// not recreated per-request. Neon's connection string already includes
// sslmode=require, pg respects that automatically.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.error("Unexpected error on idle Postgres client", err);
});
