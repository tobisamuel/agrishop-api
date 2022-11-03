const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  deleteUser,
  getUser,
  updateUser,
  changePassword,
  getWishlist,
} = require("../controllers/usersController");
const { getAllOrders } = require("../controllers/ordersController");

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/orders").get(getAllOrders);
router.route("/password").post(changePassword);
router.route("/:id/wishlist").get(getWishlist).post(addToWishlist);

module.exports = router;
