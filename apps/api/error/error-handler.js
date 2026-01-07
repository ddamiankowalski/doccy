const logger = require("../logger/logger");

/**
 * Custom error handler
 *
 * @param {*} err
 * @param {*} _
 * @param {*} res
 * @param {*} __
 */
const errorHandler = (err, _, res, __) => {
  const status = err.status || 500;

  logger.error(err.message);

  res.status(status).json({
    status,
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
