const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
} = require("../controllers/productsController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:slug").get(getProduct);
router.route("/").post(createProduct);

module.exports = router;
