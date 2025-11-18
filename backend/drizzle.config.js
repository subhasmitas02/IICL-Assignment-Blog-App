import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { URL } from 'url';


const dbUrl = new URL(process.env.DATABASE_URL);
const [user, password] = dbUrl.pathname.slice(2).split(':');

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port), 
    user: user, 
    password: password.split('@')[0], // Extract password before the host
    database: dbUrl.pathname.slice(1).split('?')[0], // Get the database name
    
    // This tells the pg driver to skip certificate validation
    ssl: {
      rejectUnauthorized: false,
    },
  },
});