const fs = require("fs").promises;
const path = require("path");
const logger = require("../../logger/logger");

/**
 * Parses the database schema in JSON format
 */
const parseSchema = async () => {
  const file = await fs.readFile(path.join(__dirname, "../schema.json"));
  return _parse(file);
};

const _parse = (file) => {
  try {
    return JSON.parse(file);
  } catch (err) {
    logger.log("Could not parse JSON file - " + err.message);
  }
};

module.exports = { parseSchema };
