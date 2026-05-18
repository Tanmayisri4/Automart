const express = require("express");

const router = express.Router();

const {

  registerUser,

  loginUser,

  getNotifications,

} = require("../controllers/authController");

const {

  protect,

} = require("../middleware/authMiddleware");


// REGISTER

router.post(
  "/register",
  registerUser
);


// LOGIN

router.post(
  "/login",
  loginUser
);


// GET NOTIFICATIONS

router.get(
  "/notifications",
  protect,
  getNotifications
);

module.exports = router;