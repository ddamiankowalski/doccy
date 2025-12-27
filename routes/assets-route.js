const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.post("/", async (req) => {
  Controller.create();

  console.log(req.ip);
});

router.get("/", async () => {
  Controller.getAll();
});

module.exports = router;
