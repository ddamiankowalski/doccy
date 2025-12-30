/**
 * Logs a message
 *
 * @param {*} message
 */
const log = (message) => {
  const time = Date.now();

  console.log(
    `[${new Date(time).getUTCHours().toString().padStart(2, "0")}:${new Date(
      time
    )
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}]: ${message}`
  );
};

/**
 * Logs an error message
 *
 * @param {*} message
 */
const error = (message) => {
  const time = Date.now();

  console.log(
    `[ERROR][${new Date(time)
      .getUTCHours()
      .toString()
      .padStart(2, "0")}:${new Date(time)
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}]: ${message}`
  );
};

module.exports = { log, error };
