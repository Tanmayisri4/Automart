const Vehicle = require("../models/Vehicle");

const Notification = require("../models/Notification");


// ADD VEHICLE
const addVehicle = async (req, res) => {

  try {

    const vehicle = await Vehicle.create({

      ...req.body,

      seller: req.user.id,

    });

    res.status(201).json({

      message: "Vehicle added successfully",

      vehicle,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// GET ALL VEHICLES
const getVehicles = async (req, res) => {

  try {

    const vehicles = await Vehicle.find()

      .populate("seller", "name email phone");

    res.status(200).json(vehicles);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// GET SINGLE VEHICLE
const getVehicleById = async (req, res) => {

  try {

    const vehicle = await Vehicle.findById(
      req.params.id
    ).populate(

      "seller",

      "name email phone"

    );

    if (!vehicle) {

      return res.status(404).json({

        message: "Vehicle not found",

      });

    }

    res.status(200).json(vehicle);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// UPDATE VEHICLE
const updateVehicle = async (req, res) => {

  try {

    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {

      return res.status(404).json({

        message: "Vehicle not found",

      });

    }

    // CHECK OWNER

    if (
      vehicle.seller.toString() !==
      req.user.id
    ) {

      return res.status(401).json({

        message: "Not authorized",

      });

    }

    const updatedVehicle =
      await Vehicle.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true,

        }

      );

    res.status(200).json({

      message: "Vehicle updated",

      updatedVehicle,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// DELETE VEHICLE
const deleteVehicle = async (req, res) => {

  try {

    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {

      return res.status(404).json({

        message: "Vehicle not found",

      });

    }

    // CHECK OWNER

    if (
      vehicle.seller.toString() !==
      req.user.id
    ) {

      return res.status(401).json({

        message: "Not authorized",

      });

    }

    await vehicle.deleteOne();

    res.status(200).json({

      message:
        "Vehicle deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADD REVIEW
const addReview = async (req, res) => {

  try {

    const {

      rating,

      comment,

    } = req.body;

    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {

      return res.status(404).json({

        message: "Vehicle not found",

      });

    }

    const review = {

      user: req.user.id,

      name: req.user.name,

      rating: Number(rating),

      comment,

    };

    vehicle.reviews.push(review);

    await vehicle.save();


    // CREATE NOTIFICATION

    await Notification.create({

      user: vehicle.seller,

      message:
        `New review added on ${vehicle.title}`,

    });


    res.status(201).json({

      message: "Review added successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


module.exports = {

  addVehicle,

  getVehicles,

  getVehicleById,

  updateVehicle,

  deleteVehicle,

  addReview,

};