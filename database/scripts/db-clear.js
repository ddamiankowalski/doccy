const db = require("../db");

/**
 * Resets the database by droping the database
 * and creating it again
 */
const reset = async () => {
  const DB_NAME = process.env.DB_NAME || "doccy";

  await _drop(DB_NAME);
  await _create(DB_NAME);
};

const _create = async (name) => {
  try {
    await db.query(`CREATE DATABASE ${name};`);
  } catch {
    console.log("== COULD NOT DROP DATABASE ==");
  }
};

/**
 * Drops database
 */
const _drop = async (name) => {
  try {
    await db.query(`DROP DATABASE ${name};`);
  } catch {
    console.log("== COULD NOT DROP DATABASE ==");
  }
};
module.exports = { reset };
