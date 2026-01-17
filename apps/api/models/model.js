const db = require('../database/db');
const SystemError = require('../error/system-error');

/**
 * Returns model object that retrieves
 *
 * @param {*} name
 * @returns
 */
const getModel = name => {
  return {
    /**
     * Retrieves all entries in database
     */
    getAll: async () => {
      return await db.query(`SELECT * FROM ${name}`);
    },

    /**
     * Returns all entries with where
     * condition
     * 
     * @param {*} conditions 
     * @returns 
     */
    getWhere: async (conditions = {}) => {
      const entries = Object.entries(conditions);

      if (!entries.length) {
        return await db.query(`SELECT * FROM ${name}`);
      }

      const whereClause = entries
        .map(([key], i) => `${key} = $${i + 1}`)
        .join(' AND ');

      const values = entries.map(([_, value]) => value);

      const query = `SELECT * FROM ${name} WHERE ${whereClause};`;

      try {
        return await db.query(query, values);
      } catch (err) {
        throw new SystemError(
          400,
          'Could not retrieve entries from database - ' + err.message
        );
      }
    },

    /**
     * Removes an entry for a given model
     *
     * @param {*} id
     */
    remove: async id => {
      if (!id) {
        throw new SystemError(
          403,
          'Could not remove entry without providing id'
        );
      }

      const query = `DELETE FROM ${name} WHERE id = $1 RETURNING *;`;

      try {
        const [deleted] = await db.query(query, [id]);

        if (!deleted) {
          throw new SystemError(
            404,
            `Could not find and remove entry with id "${id}"`
          );
        }

        return deleted;
      } catch (err) {
        if (err instanceof SystemError) {
          throw err;
        }

        throw new SystemError(
          400,
          'Could not remove entry from database - ' + err.message
        );
      }
    },

    /**
     * Creates an entry for a given model
     *
     * @param {*} model
     * @returns
     */
    create: async data => {
      const entries = Object.entries(data);

      if (!entries.length) {
        return await db.query(
          `INSERT INTO ${name} DEFAULT VALUES RETURNING *;`
        );
      }

      const placeholders = entries.map((_, i) => `$${i + 1}`).join(', ');
      const keys = entries.map(([key]) => key).join(', ');
      const values = entries.map(([_, value]) => value);

      const query = `INSERT INTO ${name} (${keys}) VALUES (${placeholders}) RETURNING *;`;

      try {
        const [created] = await db.query(query, values);
        return created;
      } catch (err) {
        throw new SystemError(
          400,
          'Could not create entry in database - ' + err.message
        );
      }
    },
  };
};

module.exports = { getModel };
