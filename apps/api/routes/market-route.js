const { Router } = require('express');
const router = Router();

const Market = require('../controllers/market-controller');
const SystemError = require('../error/system-error');

router.get('/search', async (req, res) => {
  const { symbol } = req.params;

  if (!symbol) {
    throw new SystemError(403, 'Cannot search for symbols without providing value');
  }

  const queries = await Market.search(symbol);
  return res.json({ status: 200, result: queries });
})

module.exports = router;