// backend/routes/blogController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. POST /api/blogs – Create a post
export const createBlog = async (req, res, next) => {
  try {
    // Input is already validated by express-validator (from the route)
    const { title, content, author } = req.body;

    // Use Prisma to create the post in the database
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        author,
      },
    });

    // Return structured JSON response (Level 1 requirement)
    res.status(201).json(newBlog);

  } catch (error) {
    // Pass any errors to the global error handler
    next(error);
  }
};