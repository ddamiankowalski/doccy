const { getModel } = require("../models/model");

/**
 * Creates a new asset
 */
const create = async () => {
  const model = getModel("assets");
  return await model.create({ dupa: "123" });
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
