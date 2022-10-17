const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const registerController = require("../controllers/registerController");
const refreshTokenController = require("../controllers/refreshTokenController");

router.route("/login").post(loginController.handleLogin);
router.route("/logout").get(logoutController.handleLogout);
router.route("/register").post(registerController.handleNewUser);
router.route("/refresh").get(refreshTokenController.handleRefreshToken);

// router.post("/", authController.handleLogin);

module.exports = router;
