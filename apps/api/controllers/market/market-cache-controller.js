const db = require('../../database/db');
const logger = require('../../logger/logger');

/**
 * Caches the equities to the database
 *
 * @param {*} equities
 */
const cacheEquities = async equities => {
  equities.forEach(({ symbol, name, shortname, longname, exchange }) => {
    try {
      db.query(
        `INSERT INTO equity_info (symbol, exchange, name, short_name, long_name) VALUES(${symbol}, ${name}, ${shortname}, ${longname}, ${exchange})`
      );
    } catch (err) {
      logger.log(
        `Could not cache equity for symbol "${symbol}" and exchange "${exchange}" - ${err.message}`
      );
    }
  });
};

module.exports = {
  cacheEquities,
};
