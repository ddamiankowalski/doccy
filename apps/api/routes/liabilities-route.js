const { Router } = require('express');
const router = Router();

const Liabilities = require('../controllers/finance/liabilities-controller');

router.post("/", async (req, res) => {
  const asset = await Liabilities.create(req.body);
  return res.json({ status: 200, result: asset });
});

router.get("/", async (_, res) => {
  const result = await Liabilities.getAll();
  return res.json({ status: 200, entries: result });
});

router.get("/add-fields", async (_, res) => {
  const fields = await Liabilities.getAddFields();
  return res.json({ status: 200, fields });
});

module.exports = router;