const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/TypeController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getallType", TypeController.getallType);
router.get("/get-details/:id", TypeController.getDetailType);

router.post("/", (req, res) => res.send("ok"));

module.exports = router;
