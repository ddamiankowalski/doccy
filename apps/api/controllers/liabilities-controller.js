const { getModel } = require('../models/model');
const { parseFields } = require('./fields-controller');

/**
 * Creates a new liability
 */
const create = async (data) => {
  if (!data) {
    return;
  }

  const model = getModel("liabilities");
  return await model.create(data);
};

/**
 * Retrieve all liabilities
 */
const getAll = async () => {
  const model = getModel("liabilities");
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
  getAddFields,
  getAll,
  create
}