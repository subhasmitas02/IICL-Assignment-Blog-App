// backend/routes/blogRoutes.js
import express from 'express';
import { body } from 'express-validator';
import * as blogController from '../controllers/blogController.js';
import { validate } from '../middleware/validationHandler.js';

const router = express.Router();

// Validation rules for creating a post (Level 4 requirement)
const createPostValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
];

// POST /api/blogs – Create a post
// Notice the order: 1. Validation Rules, 2. 'validate' handler, 3. Controller
router.post('/', createPostValidation, validate, blogController.createBlog);

export default router;