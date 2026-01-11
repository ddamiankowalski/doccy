const logger = require("../logger/logger");

class SystemError extends Error {
  #status = 500;

  constructor(status, message = "No message") {
    super(message);
    this.#status = status;

    /**
     * Log message to logger
     */
    logger.error(message);
  }

  get status() {
    return this.#status;
  }

  /**
   *
   * @returns error payload as javascript object
   */
  get payload() {
    return {
      status: this.#status,
      message: this.message,
    };
  }
}

module.exports = SystemError;
