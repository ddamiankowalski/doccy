const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.post("/", async (req, res) => {
  try {
    const created = await Controller.create(req.body);
    return res.json(created);
  } catch (err) {
    return res.json(err.payload);
  }
});

router.get("/", async (_, res) => {
  const result = await Controller.getAll();
  return res.json({ status: 200, entries: result });
});

module.exports = router;
