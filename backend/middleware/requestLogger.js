const fs = require('fs');
const path = require('path');

/**
 * Middleware to log incoming requests.
 * Logs in format: [METHOD] [PATH] [TIMESTAMP]
 */
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const log = `[${req.method}] ${req.originalUrl} ${timestamp}`;
  console.log(log);
  // Optionally write to a file
  // fs.appendFileSync(path.join(__dirname, '..', 'logs', 'requests.log'), log + '\n');
  next();
}

module.exports = requestLogger;
