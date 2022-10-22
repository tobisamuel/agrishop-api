const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} = require("../controllers/ordersController");

const router = express.Router();

router.route("/:id").get(getOrder).put(updateOrder);

router.route("/").post(createOrder);

module.exports = router;
