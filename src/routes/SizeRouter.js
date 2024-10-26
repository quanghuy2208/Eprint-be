const express = require("express");
const router = express.Router();
const SizeController = require("../controllers/SizeController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getallSize", SizeController.getallSize);
router.get("/get-details/:id", SizeController.getDetailsSize);
router.delete("/delete-size/:id", SizeController.deleteSize);
router.put("/update-size/:id", SizeController.updateSize);

router.post("/", (req, res) => res.send("ok"));

module.exports = router;
