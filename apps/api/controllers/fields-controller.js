const SystemError = require('../error/system-error');
const logger = require('../logger/logger');

const fs = require('fs').promises;
const path = require('path');

const parseFields = async (type) => {
  logger.log('Parsing the fields');

  const file = await fs.readFile(path.join(__dirname, `${type}-fields.json`));
  return _parse(file);
}

const _parse = (file) => {
  try {
    return JSON.parse(file);
  } catch (err) {
    logger.log("Could not parse JSON file -", + err.message);
    throw new SystemError(404, 'Could not parse fields file');
  }
}

module.exports = {};