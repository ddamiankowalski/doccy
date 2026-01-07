const { Router } = require("express");
const router = Router();

const Assets = require("../controllers/assets-controller");

router.post("/", async (req, res) => {
  const asset = await Assets.create(req.body);
  return res.json({ status: 200, asset });
});

router.get("/", async (_, res) => {
  const result = await Assets.getAll();
  return res.json({ status: 200, entries: result });
});

router.get("/add-fields", async (_, res) => {
  const fields = await Assets.getAddFields();
  return res.json({ status: 200, fields });
});

module.exports = router;
