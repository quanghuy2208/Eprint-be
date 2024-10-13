const express = require("express");
const router = express.Router();
const expressController = require("../controllers/ExpressController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/generateOtp", expressController.generateOtp);
router.post("/sendOtp", expressController.sendOtp);
router.post("/validateOtp", expressController.validateOtp);

router.post("/", (req, res) => res.send("ok"));

module.exports = router;
