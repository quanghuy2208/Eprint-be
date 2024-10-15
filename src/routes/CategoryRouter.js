const express = require("express");
const router = express.Router();
const getAllCategorylv1 = require("../controllers/CategoryController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.get("/getAllcategorylv1", getAllCategorylv1.getAllCategorylv1);
router.post("/", (req, res) => res.send("ok"));

module.exports = router;
