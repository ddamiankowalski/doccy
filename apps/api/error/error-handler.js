const logger = require('../logger/logger');

/**
 * Custom error handler
 * 
 * @param {*} err 
 * @param {*} _ 
 * @param {*} res 
 */
const errorHandler = (err, _, res) => {
  logger.error(err.message);
  res.status(err.status).json({ status: err.status, message: err.message });
}

module.exports = {
  errorHandler
}