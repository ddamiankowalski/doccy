const { createTable } = require("./db-create");

/**
 * Sets up database
 */
const migrate = async ({ clear = true } = {}) => {
  if (clear) {
    console.log("clear!");
  }

  await createTable("users", ["id VARCHAR(255)"]);
};

module.exports = {
  migrate,
};
