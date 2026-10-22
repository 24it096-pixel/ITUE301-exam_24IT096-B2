/**
 * Global error handling middleware.
 * Sends JSON response with message and optional stack (in development).
 */
function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const response = {
    message: err.message || 'Internal Server Error',
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  res.status(status).json(response);
}

module.exports = errorHandler;
