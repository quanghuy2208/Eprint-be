const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getAllcategorylv1", categoryController.getAllCategorylv1);
router.post("/", (req, res) => res.send("ok"));

module.exports = router;
