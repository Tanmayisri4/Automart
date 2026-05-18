const User = require("../models/User");

const Vehicle = require("../models/Vehicle");


// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ALL VEHICLES
const getAllVehicles = async (req, res) => {

  try {

    const vehicles = await Vehicle.find()
      .populate("seller", "name email");

    res.status(200).json(vehicles);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE ANY VEHICLE
const deleteAnyVehicle = async (req, res) => {

  try {

    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {

      return res.status(404).json({
        message: "Vehicle not found",
      });

    }

    await vehicle.deleteOne();

    res.status(200).json({
      message: "Vehicle deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  getAllUsers,
  getAllVehicles,
  deleteAnyVehicle,
};