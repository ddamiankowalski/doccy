const db = require('../../database/db');
const logger = require('../../logger/logger');

/**
 * Caches the equities to the database
 *
 * @param {*} equities
 */
const cacheEquities = async equities => {
  equities.forEach(async ({ symbol, name, shortname, longname, exchange }) => {
    try {
      await db.query(
        `INSERT INTO equity_info (symbol, exchange, name, short_name, long_name) VALUES($1, $2, $3, $4, $5) ON CONFLICT (symbol, exchange) DO NOTHING`,
        [symbol, exchange, name, shortname, longname]
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
