const Assets = require("../models/assets-model");
const { getModel } = require("../models/model");

/**
 * Creates a new asset
 *
 * @param {*} type
 */
const create = (type) => {
  Assets.findAll();
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
