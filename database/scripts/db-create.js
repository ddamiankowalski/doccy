const db = require("../db");
const logger = require("../../logger/logger");

/**
 * Creates a table in postgres database
 *
 * @param {*} name
 * @param {*} fields
 */
const createTable = async (name, fields) => {
  try {
    logger.log(`Creating table ${name}`);
    return await db.query(`CREATE TABLE ${name} (${fields.join(",")})`);
  } catch (err) {
    logger.log(`Failed to create table ${name} - ${err.message}`);
  }
};

module.exports = {
  createTable,
};
