const postgres = require("postgres");

let connection = null;

/**
 * Initializes database connection
 */
const init = async () => {
  if (connection !== null) {
    return connection;
  }

  const connection = postgres({});
  return connection;
};

module.exports = { init, connection };
