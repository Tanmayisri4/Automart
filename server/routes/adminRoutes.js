const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllVehicles,
  deleteAnyVehicle,
} = require("../controllers/adminController");

const {
  protect,
} = require("../middleware/authMiddleware");


// GET ALL USERS
router.get(
  "/users",
  protect,
  getAllUsers
);


// GET ALL VEHICLES
router.get(
  "/vehicles",
  protect,
  getAllVehicles
);


// DELETE ANY VEHICLE
router.delete(
  "/vehicles/:id",
  protect,
  deleteAnyVehicle
);

module.exports = router;