const SystemError = require("../../error/system-error");
const { getModel } = require("../../models/model");
const { parseFields } = require("../fields/fields-controller");

const Stocks = require('./stocks-controller');

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
 * Adds finance entry with correct type and
 * name
 * 
 * @param {*} type 
 * @param {*} name 
 */
const createEntry = async (data) => {
  const model = getModel('asset_entries');
  return await model.create(data);
}

/**
 * Removes finance entry
 * 
 * @param {*} id 
 * @returns 
 */
const removeEntry = async (id) => {
  const model = getModel('asset_entries');
  return await model.remove(id);
}

/**
 * Creates record in assets for a given
 * entry type
 * 
 * @param {*} entry 
 * @param {*} model 
 * @returns 
 */
const createRecord = async (entry, data) => {
  const model = getModel(entry);
  return model.create(data);
}

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
const getEntryFields = async () => {
  return await parseFields('assets-entry');
}

/**
 * Returns fields for adding an item
 * in asset entry
 * 
 * @returns 
 */
const getAddFields = async (type) => {
  if (!type) {
    throw new SystemError(403, 'Cannot fetch fields with undefined type');
  }

  return await parseFields(`assets-${type}`);
}

/**
 * Returns all assets entries
 * 
 * @returns 
 */
const getEntries = async () => {
  const model = getModel("asset_entries");
  const entries = await model.getAll();

  return entries.map(entry => {
    const { type } = entry;

    switch (type) {
      case 'stocks':
        return Stocks.getEntry(entry);
      default:
        return entry;
    }
  })
}

module.exports = {
  create,
  getAll,
  getEntryFields,
  getSections,
  createEntry,
  removeEntry,
  getEntries,
  getAddFields,
  createRecord
};
