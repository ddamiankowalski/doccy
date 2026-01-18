const SystemError = require('../../error/system-error');
const { getModel } = require('../../models/model');
const { parseFields } = require('../fields/fields-controller');

const Stocks = require('./stocks-controller');

/**
 * Adds finance entry with correct type and
 * name
 *
 * @param {*} type
 * @param {*} name
 */
const createEntry = async data => {
  const model = getModel('asset_entries');
  const entry = await model.create(data);
  
  return await _getDetailedEntry(entry);
};

/**
 * Removes finance entry
 *
 * @param {*} id
 * @returns
 */
const removeEntry = async id => {
  const model = getModel('asset_entries');
  return await model.remove(id);
};

/**
 * Creates record in assets for a given
 * entry type
 *
 * @param {*} type
 * @param {*} assetId
 * @param {*} model
 * @returns
 */
const createRecord = async (type, assetId, data) => {
  const model = getModel(type);
  return model.create({ ...data, assetId });
};

/**
 * Returns all sections for assets
 *
 * @returns
 */
const getSections = async () => {
  const model = getModel('assets_sections');
  return await model.getAll();
};

/**
 * Parses the JSON and returns it
 *
 * @returns
 */
const getEntryFields = async () => {
  return await parseFields('assets-entry');
};

/**
 * Returns fields for adding an item
 * in asset entry
 *
 * @returns
 */
const getAddFields = async type => {
  if (!type) {
    throw new SystemError(403, 'Cannot fetch fields with undefined type');
  }

  return await parseFields(`assets-${type}`);
};

/**
 * Returns all assets entries
 *
 * @returns
 */
const getEntries = async () => {
  const model = getModel('asset_entries');
  const entries = await model.getAll();

  return await Promise.all(
    entries.map(async entry => _getDetailedEntry(entry))
  );
};

/**
 * Returns given entry by id
 */
const getEntry = async (id) => {
  const model = getModel('asset_entries');
  const entry = await model.findOne({ id });

  if(!entry) {
    throw new SystemError(404, `Could not find entry by id: "${id}"`)
  }

  return entry;
}

const _getDetailedEntry = async entry => {
  const { type } = entry;

  switch (type) {
    case 'stocks':
      entry = await Stocks.getStocks(entry);
      break;
  }

  return {
    ...entry,
    section: 'assets',
  }
};

module.exports = {
  getEntryFields,
  getSections,
  createEntry,
  removeEntry,
  getEntries,
  getAddFields,
  getEntry,
  createRecord,
};
