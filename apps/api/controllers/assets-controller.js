const { getModel } = require("../models/model");
const { parseFields } = require("./fields-controller");

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

/**
 * Parses the JSON and returns it
 * 
 * @returns 
 */
const getAddFields = async () => {
  return await parseFields('assets');
}

module.exports = {
  create,
  getAll,
  getAddFields
};
