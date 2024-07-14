const express = require("express");
const router = express.Router();
const { authProtection } = require("../middleware/auth");

const {
  signUp,
  login,
  getUser,
  updatePersonalInfo,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

router.route("/get-user").get(authProtection, getUser);

router.route("/signup").post(signUp);

router.route("/login").post(login);

router.route("/update-user").patch(authProtection, updatePersonalInfo);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").patch(resetPassword);

module.exports = router;
