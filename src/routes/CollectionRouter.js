const express = require("express");
const router = express.Router();
const CollectionController = require("../controllers/CollectionController");

router.post("/create", CollectionController.createCollection);
router.put("/update/:id", CollectionController.updateCollection);
router.get("/get-details/:id", CollectionController.getDetailsCollection);
router.delete("/delete/:id", CollectionController.deleteCollection);
router.get("/get-all", CollectionController.getAllCollection);
router.get("/get-all-type", CollectionController.getAllType);

module.exports = router;
