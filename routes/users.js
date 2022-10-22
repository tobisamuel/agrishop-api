const express = require("express");

const router = express.Router();

const {
  deleteUser,
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/usersController");
const { getAllOrders } = require("../controllers/ordersController");

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/orders").get(getAllOrders);
router.route("/password").post(changePassword);

module.exports = router;
