const { getModel } = require("../../models/model");
const { parseFields } = require("../fields-controller");

/**
 * Creates a new asset
 */
const create = async (type, data) => {
  if (!data) {
    return;
  }

  const filtered = Object.fromEntries(
  Object.entries(data).filter(([_, value]) => value !== null)
);

  const model = getModel(type);
  return await model.create(filtered);
};

/**
 * Returns all sections for assets
 * 
 * @returns 
 */
const getSections = async () => {
  const model = getModel('assets_sections');
  return await model.getAll();
}

/**
 * Retrieve all assets
 */
const getAll = async () => {
  const model = getModel("stocks");
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
  getAddFields,
  getSections
};
