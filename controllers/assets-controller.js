const { getModel } = require("../models/model");

/**
 * Creates a new asset
 *
 * @param {*} type
 */
const create = (type) => {
  console.log(type);
};

/**
 * Retrieve all assets
 */
const getAll = async () => {
  const model = getModel("assets");
  return await model.getAll();
};

module.exports = {
  create,
  getAll,
};
