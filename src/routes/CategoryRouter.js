const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/getAllcategorylv1", CategoryController.getAllUser);
router.post("/", (req, res) => res.send("ok"));

module.exports = router;
