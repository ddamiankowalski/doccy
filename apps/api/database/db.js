const postgres = require("pg-promise")();
const { types } = require("pg");

/**
 * Options for the database
 */
const opts = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
};

/**
 * Database instance
 */
const db = postgres(opts);

module.exports = db;
