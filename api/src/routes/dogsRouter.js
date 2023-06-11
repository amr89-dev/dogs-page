const { Router } = require("express");

const {
  getAllDogs,
  getDogById,
  getDogByBreed,
  postDog,
} = require("../controllers/DogController");

const router = Router();

router.get("/", (req, res) => {
  getAllDogs(req, res);
});
router.get("/name?", (req, res) => {
  getDogByBreed(req, res);
});
router.get("/:idRaza", (req, res) => {
  getDogById(req, res);
});

router.post("/", (req, res) => {
  postDog(req, res);
});

module.exports = router;
