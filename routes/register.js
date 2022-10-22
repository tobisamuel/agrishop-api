const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post("/user", registerController.createNewUser);
router.post("/vendor", registerController.createNewVendor);

module.exports = router;
