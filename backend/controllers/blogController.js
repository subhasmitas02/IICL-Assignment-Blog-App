// backend/controllers/blogController.js

// 1. IMPORTS GO AT THE VERY TOP
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 2. HELPER FUNCTION
// Helper to handle async route errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper function to create a date range filter for a specific day
// This function converts a YYYY-MM-DD string into a Prisma filter 
// for the start of the day (>=) and the start of the next day (<).
const getDateRangeFilter = (dateString) => {
  if (!dateString) return null;

  try {
    // 1. Start of the day (inclusive, gte)
    // Appending 'T00:00:00.000Z' ensures the date is treated as midnight UTC 
    // for the selected day, which is necessary for correct date filtering.
    const startDate = new Date(`${dateString}T00:00:00.000Z`);
    
    // 2. Start of the next day (exclusive, lt)
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    
    // Basic validation to ensure valid dates
    if (isNaN(startDate.getTime()) || isNaN(nextDay.getTime())) {
      return null;
    }
    
    return {
      gte: startDate,
      lt: nextDay,
    };
  } catch (e) {
    console.error("Date parsing error:", e);
    return null;
  }
};


// 3. FUNCTIONS WRAPPED IN THE HELPER

// 1. POST /api/blogs – Create a post
export const createBlog = asyncHandler(async (req, res, next) => {
  // Input is already validated...
  const { title, content, author } = req.body;
  
  const newBlog = await prisma.blog.create({
    data: {
      title,
      content,
      author,
    },
  });
  
  res.status(201).json(newBlog);
});

// 2. GET /api/blogs – Get all posts (with Pagination, Author Filter, and Date Filter)
export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  
  // Get all filter and pagination queries, replacing startDate/endDate ---
  const { author, createdAtDate, updatedAtDate } = req.query; 

  const skip = (page - 1) * pageSize;

  const where = {};
  
  // 1. Author Filter Logic
  if (author) {
    where.author = {
      // Use 'contains' for partial matching and 'insensitive' for case-insensitivity
      contains: author,
      mode: 'insensitive', 
    };
  }
  
  // 2. CreatedAt Date Filter Logic (Exact day match)
  const createdAtRange = getDateRangeFilter(createdAtDate);
  if (createdAtRange) {
    where.createdAt = createdAtRange;
  }

  // 3. UpdatedAt Date Filter Logic (Exact day match)
  const updatedAtRange = getDateRangeFilter(updatedAtDate);
  if (updatedAtRange) {
    where.updatedAt = updatedAtRange;
  }

  // Use the 'where' clause in both the 'findMany' and 'count' queries
  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      where: where,
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.blog.count({
      where: where,
    }),
  ]);

  res.status(200).json({
    data: blogs,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

// 3. GET /api/blogs/{id} – Get a post by ID
export const getBlogById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.status(200).json(blog);
});

// 4. PUT /api/blogs/{id} – Update a post
export const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        author,
      },
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    // Handle case where the post to update doesn't exist
    if (error.code === 'P2025') { 
      return res.status(404).json({ error: 'Blog post not found' });
    }
    next(error);
  }
});


// 5. DELETE /api/blogs/{id} – Delete a post
export const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({
      where: { id },
    });
    // 204 No Content is the standard response for a successful delete
    res.status(204).send(); 
  } catch (error) {
    // Handle case where the post to delete doesn't exist
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    next(error);
  }
});