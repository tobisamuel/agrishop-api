const express = require("express");
const {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
} = require("../controllers/addressesController");

const router = express.Router();

router
  .route("/:id")
  .get(getAllAddresses)
  .get(getAddress)
  .put(updateAddress)
  .delete(deleteAddress);

router.route("/").post(createAddress);

module.exports = router;
