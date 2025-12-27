const { createTable } = require("./db-create");
const { reset } = require("./db-clear");

/**
 * Sets up database
 */
const migrate = async ({ clear = true } = {}) => {
  if (clear) {
    await reset();
  }

  await createTable("users", ["id VARCHAR(255)"]);
};

module.exports = {
  migrate,
};
