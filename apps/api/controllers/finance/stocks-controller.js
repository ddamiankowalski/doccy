const { getModel } = require("../../models/model");

/**
 * Returns stock entry
 * 
 * @param {*} entry 
 * @returns 
 */
const getStocks = async (entry) => {
  const { id } = entry;

  const model = getModel('stocks');
  const stocks = await model.getWhere({ asset_id: id })

  return {
    ...entry,
    stocks,
    profit: _calculateProfit(stocks)
  };
}

const _calculateProfit = (stocks) => {
  return null;

  /**
   * TODO: Calculate profit based on market prices
   */
  return stocks.reduce((sum, stock) => stock.profit + sum, 0);
}

module.exports = {
  getStocks,
}