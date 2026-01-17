/**
 * Returns stock entry
 * 
 * @param {*} entry 
 * @returns 
 */
const getEntry = (entry) => {
  const profit = 2;

  return {
    ...entry,
    profit
  };
}

module.exports = {
  getEntry,
}