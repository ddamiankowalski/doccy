const postgres = require("pg-promise")();

/**
 * Options for the database
 */
const opts = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "doccy",
};

/**
 * Database instance
 */
const db = postgres(opts);

module.exports = db;
