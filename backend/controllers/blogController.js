// backend/controllers/blogController.js

// 1. IMPORTS GO AT THE VERY TOP
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 2. HELPER FUNCTION
// Helper to handle async route errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


// 3. YOUR FUNCTIONS WRAPPED IN THE HELPER

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

// 2. GET /api/blogs – Get all posts (with Pagination Bonus)
export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  
  const skip = (page - 1) * pageSize;

  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.blog.count(),
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