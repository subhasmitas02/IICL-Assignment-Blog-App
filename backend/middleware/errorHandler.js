// Global error handler for consistent JSON responses
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};