import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    // We append ?ssl=true to force the migration tool to use SSL
    url: process.env.DATABASE_URL + '?ssl=true',
  },
});