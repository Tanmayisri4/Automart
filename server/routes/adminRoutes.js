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
const adminOnly = require("../middleware/adminMiddleware");


// GET ALL USERS
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


// GET ALL VEHICLES
router.get(
  "/vehicles",
  protect,
  adminOnly,
  getAllVehicles
);


// DELETE ANY VEHICLE
router.delete(
  "/vehicles/:id",
  protect,
  adminOnly,
  deleteAnyVehicle
);

module.exports = router;