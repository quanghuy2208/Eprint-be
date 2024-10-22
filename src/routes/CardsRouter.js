const express = require("express");
const router = express.Router();
const CardsController = require("../controllers/CardsController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getAllCards", CardsController.getAllCards);

router.post("/", (req, res) => res.send("ok"));

module.exports = router;
