import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // This forces SSL connection for the running application
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool);