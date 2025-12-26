const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/assets-controller");

router.get("/", async () => {
  Controller.create();
});

module.exports = router;
