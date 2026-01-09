const SystemError = require("../error/system-error");

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
const search = async (symbol) => {
  try {
    const { quotes } = await api.search(symbol);

    return quotes
      .filter((quote) => "quoteType" in quote && quote.quoteType === "EQUITY")
      .map(({ symbol, name, shortname, longname }) => {
        return { symbol, name: longname || shortname || name };
      });
  } catch {
    throw SystemError(
      `Could not fetch results for searching market symbol "${symbol}"`
    );
  }
};

module.exports = {
  search,
};
