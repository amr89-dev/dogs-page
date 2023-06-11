const { Router } = require("express");
const router = Router();

const { getTemperaments } = require("../controllers/TemperamentController");

router.get("/", (req, res) => {
  getTemperaments(req, res);
});

module.exports = router;
