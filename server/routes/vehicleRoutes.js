const express = require("express");

const router = express.Router();

const {

  addVehicle,

  getVehicles,

  getVehicleById,

  updateVehicle,

  deleteVehicle,

  addReview,

} = require("../controllers/vehicleController");

const {

  protect,

} = require("../middleware/authMiddleware");


// GET ALL VEHICLES

router.get(
  "/",
  getVehicles
);


// GET SINGLE VEHICLE

router.get(
  "/:id",
  getVehicleById
);


// ADD VEHICLE

router.post(
  "/",
  protect,
  addVehicle
);


// UPDATE VEHICLE

router.put(
  "/:id",
  protect,
  updateVehicle
);


// DELETE VEHICLE

router.delete(
  "/:id",
  protect,
  deleteVehicle
);


// ADD REVIEW

router.post(
  "/:id/reviews",
  protect,
  addReview
);

module.exports = router;