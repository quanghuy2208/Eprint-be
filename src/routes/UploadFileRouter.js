const express = require("express");
const router = express.Router();
const UploadFileController = require("../controllers/UploadFileController");

const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });

router.post("/", upload.single("file"), UploadFileController.uploadFile);

module.exports = router;
