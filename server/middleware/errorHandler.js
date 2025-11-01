/**
 * Centralized error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(statusCode).json({
      success: false,
      errors,
    });
  }

  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate entry';
  }

  // Development vs production error messages
  const errorResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;



