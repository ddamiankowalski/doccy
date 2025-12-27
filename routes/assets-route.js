const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.post("/", async (req, res) => {
  await Controller.create(req.body);
  return res.send();
});

router.get("/", async (_, res) => {
  const result = await Controller.getAll();
  return res.json(result);
});

module.exports = router;
