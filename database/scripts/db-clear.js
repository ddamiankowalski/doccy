const db = require("../db");
const logger = require("../../logger/logger");

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
module.exports = { reset };
