const { createTable } = require("./db-create");

/**
 * Sets up database
 */
const migrate = async () => {
  await createTable("users", []);
};

module.exports = {
  migrate,
};
