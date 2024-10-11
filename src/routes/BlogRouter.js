const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

router.post("/create", BlogController.createBlog);
router.put("/update/:id", BlogController.updateBlog);
router.get("/get-details/:id", BlogController.getDetailsBlog);
router.delete("/delete/:id", BlogController.deleteBlog);
router.get("/get-all", BlogController.getAllBlog);
router.get("/get-all-type", BlogController.getAllType);

module.exports = router;
