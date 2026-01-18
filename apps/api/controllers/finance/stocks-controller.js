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
  
  const stocks = await model.getWhere({ assetId: id })
  const value = _getValue(stocks);

  return {
    ...entry,
    stocks,
    value,
    icon: 'dollar-sign',
    profit: _calculateProfit(stocks)
  };
}

const _getValue = stocks => {
  if(stocks.length === 0) {
    return null;
  }

  return stocks.reduce((value, stock) => value + stock.price, 0);
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