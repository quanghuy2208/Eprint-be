const express = require("express");
const router = express.Router();
const SizeController = require("../controllers/SizeController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getallSize", SizeController.getallSize);
router.post("/delete-size/:id", SizeController.deleteSize);
router.post("/", (req, res) => res.send("ok"));

module.exports = router;
