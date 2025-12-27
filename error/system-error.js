const logger = require("../logger/logger");

class SystemError extends Error {
  constructor(status, message = "No message") {
    super(message);

    /**
     * Log message to logger
     */
    logger.error(message);
  }

  /**
   *
   * @returns error payload as javascript object
   */
  get payload() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

module.exports = SystemError;
