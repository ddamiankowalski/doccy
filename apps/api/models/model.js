const db = require("../database/db");
const logger = require('../logger/logger');
const SystemError = require("../error/system-error");

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

    /**
     * Creates an entry for a given model
     *
     * @param {*} model
     * @returns
     */
    create: async (data) => {
      const entries = Object.entries(data);

      if (!entries.length) {
        return await db.query(
          `INSERT INTO ${name} DEFAULT VALUES RETURNING *;`
        );
      }

      const keys = entries.map(([key]) => key).join(", ");
      const values = entries.map(([_, value]) => {
        switch (true) {
          case value === null:
            return 'NULL';
          case typeof value === 'boolean':
          case typeof value === 'number':
            return `${value}`;
          default:
            return `'${value}'`;
        }
      }).join(", ");

      const query = `INSERT INTO ${name} (${keys}) VALUES (${values}) RETURNING *;`;

      try {
        const [created] = await db.query(query);
        return created;
      } catch (err) {
        throw new SystemError(
          400,
          "Could not create entry in database - " + err.message
        );
      }
    },
  };
};

module.exports = { getModel };
