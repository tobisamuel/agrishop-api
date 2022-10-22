const express = require("express");
const {
  getProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
} = require("../controllers/productsController");

const router = express.Router();

const {
  deleteVendor,
  getVendor,
  updateVendor,
  changePassword,
} = require("../controllers/vendorsController");

router.route("/:id").get(getVendor).put(updateVendor).delete(deleteVendor);
router.route("/password").post(changePassword);
router.route("/:id/products").get(getVendorProducts);

router
  .route("/:id/products/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
