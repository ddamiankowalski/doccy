/**
 * Logs a message
 *
 * @param {*} message
 */
const log = (message) => {
  const time = Date.now();

  console.log(
    `[${new Date(time).getUTCHours()}:${new Date(
      time
    ).getUTCMinutes()}]: ${message}`
  );
};

module.exports = { log };
