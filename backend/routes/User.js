const express = require("express");
const { register, login, logout, updateuser, updatepass, otpSend, otpVerify, googleauth} = require('../controllers/User');
const { isauth } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/otpsend").post(otpSend);
router.route("/verify").post(otpVerify)
router.route("/login").post(login);
router.route("/logout").put(logout);
router.route("/profile/update").put(isauth,updateuser);
router.route("/profile/update/password").put(isauth,updatepass);
router.route("/googleauth").post(googleauth)
module.exports=router;