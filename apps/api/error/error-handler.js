const logger = require('../logger/logger');

/**
 * Custom error handler
 * 
 * @param {*} err 
 * @param {*} _ 
 * @param {*} res
 * @param {*} __ 
 */
const errorHandler = (err, _, res, __) => {
  logger.error(err.message);

  if (err.status === undefined) {
    err.status = 500;
  }

  res.status(err.status).json({ status: err.status, message: err.message });
}

module.exports = {
  errorHandler
}