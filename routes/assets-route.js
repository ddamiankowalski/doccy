const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.post("/create", async (req) => {
  Controller.create();

  console.log(req.ip);
});

module.exports = router;
