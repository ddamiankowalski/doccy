const db = require("../db");
const logger = require("../../logger/logger");
const parser = require("./db-schema-parser");

/**
 * Creates tables in postgres database
 *
 * @param {*} name
 * @param {*} fields
 */
const createTables = async ({ tables }) => {
  tables.forEach(({ name, columns }) => {
    console.log(columns);
    const fields = columns.map(({ name, type }) => {
      return `${name} ${_getTypeQuery(type)}`;
    });

    _createTable(name, fields);
  });
};

const _getTypeQuery = (type) => {
  switch (type) {
    case "varchar":
      return "VARCHAR(255)";
  }

  return "VARCHAR(255)";
};

const _createTable = async (name, fields) => {
  console.log(fields);
  try {
    logger.log(`Creating table "${name}"`);
    return await db.query(`CREATE TABLE ${name} (${fields.join(",")})`);
  } catch (err) {
    logger.log(`Failed to create table ${name} - ${err.message}`);
  }
};

/**
 * Resets the database by droping the database
 * and creating it again
 */
const reset = async () => {
  const DB_NAME = process.env.DB_NAME || "doccy";
  logger.log(`Resetting the database for name "${DB_NAME}"`);

  await _drop(DB_NAME);
};

/**
 * Drops database
 */
const _drop = async () => {
  try {
    await db.query(`
      DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP; 
END $$;
      `);
  } catch (err) {
    logger.log(`Could not drop database "${DB_NAME}"`);
  }
};

/**
 * Sets up database
 */
const migrate = async ({ clear = true } = {}) => {
  if (clear) {
    await reset();
  }

  const schema = await parser.parseSchema();
  await createTables(schema);
};

module.exports = { migrate };
