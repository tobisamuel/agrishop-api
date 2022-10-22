const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const refreshTokenController = require("../controllers/refreshTokenController");

router.route("/user/login").post(loginController.handleUserLogin);
router.route("/vendor/login").post(loginController.handleVendorLogin);
router.route("/logout").get(logoutController.handleLogout);
router.route("/refresh").get(refreshTokenController.handleRefreshToken);

module.exports = router;
