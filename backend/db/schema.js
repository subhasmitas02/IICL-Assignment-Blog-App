import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// This replaces your schema.prisma "model Blog" definition
export const blogs = pgTable('Blog', {
  // id String @id @default(cuid()) -> We use UUID for standard compatibility
  id: uuid('id').defaultRandom().primaryKey(), 
  
  title: text('title').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  
  // createdAt DateTime @default(now())
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  
  // updatedAt DateTime @updatedAt
  updatedAt: timestamp('updatedAt').defaultNow().$onUpdate(() => new Date()).notNull(),
});