import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './schema';
import { PRIVATE_PG_PASSWORD } from '$env/static/private';

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: 'test',
    host: 'localhost',
    user: 'postgres',
    password: PRIVATE_PG_PASSWORD,
    port: 5432,
    max: 10
  })
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect
});
