const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.post("/", async (req, res) => {
  try {
    await Controller.create(req.body);
    return res.send();
  } catch (err) {
    return res.json(err.payload);
  }
});

router.get("/", async (_, res) => {
  const result = await Controller.getAll();
  return res.json(result);
});

module.exports = router;
