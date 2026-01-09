const fs = require("fs").promises;
const path = require("path");
const logger = require("../../logger/logger");

/**
 * Parses all the schemas and returns
 * the promise as a result
 * 
 * @returns 
 */
const parseSchemas = async () => {
  const schemas = await fs.readdir(path.join(__dirname, '../schemas'));

  return await Promise.all(schemas
    .filter(file => path.extname(file) === '.json')
    .map(file => path.basename(file, '.json'))
    .map(file => _parseSchema(file)))
}

/**
 * Parses the database schema in JSON format
 */
const _parseSchema = async (name) => {
  logger.log(`Parsing the database schema "${name}"`);

  try {
    const file = await fs.readFile(path.join(__dirname, `../schemas/${name}.json`));
    return _parse(file);
  }
  catch (err) {
    logger.log(`Error ocurred while parsing schema "${name}" - ${err.message}`);
    process.exit();
  }
};

const _parse = (file) => {
  try {
    return JSON.parse(file);
  } catch (err) {
    logger.log("Could not parse JSON file - " + err.message);
    process.exit();
  }
};

module.exports = { parseSchemas };
