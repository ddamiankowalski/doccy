const { getModel } = require("../models/model");

/**
 * Creates a new asset
 */
const create = async (data) => {
  if (!data) {
    return;
  }

  const model = getModel("assets");
  return await model.create(data);
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
