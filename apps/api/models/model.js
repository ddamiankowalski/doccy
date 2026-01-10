const db = require("../database/db");
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

      const placeholders = entries.map((_, i) => `$${i + 1}`).join(", ");
      const keys = entries.map(([key]) => key).join(", ");
      const values = entries.map(([_, value]) => value);

      const query = `INSERT INTO ${name} (${keys}) VALUES (${placeholders}) RETURNING *;`;

      try {
        const [created] = await db.query(query, values);
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
