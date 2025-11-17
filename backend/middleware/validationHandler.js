import { validationResult } from 'express-validator';

// Middleware to handle validation errors from express-validator
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Return structured error response (Level 4 requirement)
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};