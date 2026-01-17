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
    stocks 
  };
}

module.exports = {
  getStocks,
}