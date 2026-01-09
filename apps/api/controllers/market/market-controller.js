const SystemError = require("../../error/system-error");
const MarketCache = require('./market-cache-controller');

const YahooFinance = require("yahoo-finance2").default;

/**
 * Reference to yahoo finance api
 */
const api = new YahooFinance();

/**
 * Searches for a given symbol
 *
 * @param {*} symbol
 * @returns
 */
const searchEquity = async (symbol) => {
  try {
    const { quotes } = await api.search(symbol);

    const equities = quotes
      .filter((quote) => "quoteType" in quote && quote.quoteType === "EQUITY")
      .map(({ symbol, name, shortname, longname, exchange }) => {
        return { symbol, name, shortname, longname, exchange };
      });
    
    MarketCache.cacheEquities(equities);
    
    return equities;
  } catch {
    throw SystemError(
      `Could not fetch results for searching market symbol "${symbol}"`
    );
  }
};

module.exports = {
  searchEquity,
};
