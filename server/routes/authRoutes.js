const express = require("express");

const router = express.Router();

const {

  registerUser,

  loginUser,

  getNotifications,
  addToFavorites,
  getFavorites,

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


// ADD TO FAVORITES

router.post(
  "/favorites/:id",
  protect,
  addToFavorites
);


// GET FAVORITES

router.get(
  "/favorites",
  protect,
  getFavorites
);


// GET NOTIFICATIONS

router.get(
  "/notifications",
  protect,
  getNotifications
);

module.exports = router;