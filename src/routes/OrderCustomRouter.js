const express = require("express");
const router = express.Router();
const OrderCustomController = require("../controllers/OrderCustomController");

router.post("/create", OrderCustomController.createOrderCustom);
router.put("/update/:id", OrderCustomController.updateOrderCustom);
router.get("/get-details/:id", OrderCustomController.getDetailsOrderCustom);
router.delete("/delete/:id", OrderCustomController.deleteOrderCustom);
router.get("/get-all", OrderCustomController.getAllOrderCustom);

module.exports = router;
