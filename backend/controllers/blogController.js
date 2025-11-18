// backend/controllers/blogController.js

import { db } from '../db/index.js';
import { blogs } from '../db/schema.js';
import { eq, ilike, and, gte, lt, desc, count } from 'drizzle-orm';

// Helper to handle async route errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper function to create a date range filter for a specific day
const getDateRangeFilter = (dateString) => {
  if (!dateString) return null;

  try {
    const startDate = new Date(`${dateString}T00:00:00.000Z`);
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    
    if (isNaN(startDate.getTime()) || isNaN(nextDay.getTime())) {
      return null;
    }
    
    return { start: startDate, end: nextDay };
  } catch (e) {
    console.error("Date parsing error:", e);
    return null;
  }
};

// 1. POST /api/blogs – Create a post
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  
  // Drizzle insert returning the created object
  const [newBlog] = await db.insert(blogs)
    .values({
      title,
      content,
      author,
    })
    .returning();
  
  res.status(201).json(newBlog);
});

// 2. GET /api/blogs – Get all posts (Pagination + Filters)
export const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const { author, createdAtDate, updatedAtDate } = req.query; 

  const conditions = [];

  // 1. Author Filter (Case-insensitive partial match)
  if (author) {
    conditions.push(ilike(blogs.author, `%${author}%`));
  }
  
  // 2. CreatedAt Date Filter
  const createdAtRange = getDateRangeFilter(createdAtDate);
  if (createdAtRange) {
    conditions.push(and(
      gte(blogs.createdAt, createdAtRange.start),
      lt(blogs.createdAt, createdAtRange.end)
    ));
  }

  // 3. UpdatedAt Date Filter
  const updatedAtRange = getDateRangeFilter(updatedAtDate);
  if (updatedAtRange) {
    conditions.push(and(
      gte(blogs.updatedAt, updatedAtRange.start),
      lt(blogs.updatedAt, updatedAtRange.end)
    ));
  }

  // Combine all conditions
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Run queries in parallel for performance
  const [data, [totalRecord]] = await Promise.all([
    db.select()
      .from(blogs)
      .where(whereClause)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy(desc(blogs.createdAt)), // Order by newest first
    
    db.select({ count: count() })
      .from(blogs)
      .where(whereClause)
  ]);

  res.status(200).json({
    data,
    meta: {
      total: totalRecord?.count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((totalRecord?.count || 0) / pageSize),
    },
  });
});

// 3. GET /api/blogs/{id} – Get a post by ID
export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const [blog] = await db.select()
    .from(blogs)
    .where(eq(blogs.id, id));

  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.status(200).json(blog);
});

// 4. PUT /api/blogs/{id} – Update a post
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  const [updatedBlog] = await db.update(blogs)
    .set({ title, content, author })
    .where(eq(blogs.id, id))
    .returning();

  if (!updatedBlog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.status(200).json(updatedBlog);
});

// 5. DELETE /api/blogs/{id} – Delete a post
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [deletedBlog] = await db.delete(blogs)
    .where(eq(blogs.id, id))
    .returning({ id: blogs.id }); // We only need to return ID to confirm deletion

  if (!deletedBlog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.status(204).send(); 
});