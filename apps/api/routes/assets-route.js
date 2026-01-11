const { Router } = require("express");
const router = Router();

const Assets = require("../controllers/finance/assets-controller");

router.post("/", async (req, res) => {
  const { type, ...data } = req.body;
    const asset = await Assets.create(type, data);
  
  return res.json({ status: 200, result: asset });
});

router.get("/", async (_, res) => {
  const assets = await Assets.getAll();
  return res.json({ status: 200, result: assets });
});

router.get("/entry-fields", async (_, res) => {
  const fields = await Assets.getEntryFields();
  return res.json({ status: 200, result: fields });
});

router.get("/entries", async (_, res) => {
  const entries = await Assets.getEntries();
  return res.json({ status: 200, result: entries });
})

router.post('/entry-add', async (req, res) => {
  const entry = await Assets.createEntry(req.body);
  return res.json({ status: 200, result: entry });
})

router.get('/add-fields', async (req, res) => {
  const { type } = req.query;

  const entry = await Assets.getAddFields(type);
  return res.json({ status: 200, result: entry });
})

router.delete('/entry-remove', async (req, res) => {
  const { id } = req.body;
  
  const entry = await Assets.removeEntry(id);
  return res.json({ status: 200, result: entry });
})

router.get('/sections', async (_, res) => {
  const sections = await Assets.getSections();
  return res.json({ status: 200, result: sections });
})

module.exports = router;
