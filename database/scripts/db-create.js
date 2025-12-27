const db = require("../db");

/**
 * Creates a table in postgres database
 *
 * @param {*} name
 * @param {*} fields
 */
const createTable = async (name, fields) => {
  try {
    console.log(`== CREATING TABLE ${name} ==\n`);
    return await db.query(`CREATE TABLE ${name} (${fields.join(" ")})`);
  } catch (err) {
    console.log(`== FAILED TO CREATE TABLE ${name} - ${err.message} ==\n`);
  }
};

module.exports = {
  createTable,
};
