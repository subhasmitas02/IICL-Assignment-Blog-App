// backend/routes/blogRoutes.js

import express from 'express';
import { body, param } from 'express-validator';
import * as blogController from '../controllers/blogController.js';
import { validate } from '../middleware/validationHandler.js';

const router = express.Router();

// --- Validation Arrays ---

// 1. Validation for POST (Create) - Checks the request body
const createPostValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
];

// 2. Validation for ID - Checks the URL parameter
const idParamValidation = [
  param('id').isString().withMessage('Invalid ID'),
];

// 3. Validation for PUT (Update) - Checks URL param and optional body fields
const updatePostValidation = [
  param('id').isString().withMessage('Invalid ID'),
  body('title').optional().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').optional(),
  body('author').optional(),
];

// --- Routes ---

// GET /api/blogs – Get all posts (no validation needed)
router.get('/', blogController.getAllBlogs);

// GET /api/blogs/{id} – Get a post by ID
router.get('/:id', idParamValidation, validate, blogController.getBlogById);

// POST /api/blogs – Create a post
router.post('/', createPostValidation, validate, blogController.createBlog);

// PUT /api/blogs/{id} – Update a post
router.put('/:id', updatePostValidation, validate, blogController.updateBlog);

// DELETE /api/blogs/{id} – Delete a post
router.delete('/:id', idParamValidation, validate, blogController.deleteBlog);

export default router;