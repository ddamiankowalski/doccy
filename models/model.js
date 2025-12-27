const db = require("../database/db");

/**
 * Returns model object that retrieves
 *
 * @param {*} name
 * @returns
 */
const getModel = (name) => {
  return {
    /**
     * Retrieves all entries in database
     */
    getAll: async () => {
      return await db.query(`SELECT * FROM ${name}`);
    },
  };
};

module.exports = { getModel };
