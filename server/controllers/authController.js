const User = require("../models/User");

const Notification = require("../models/Notification");

const Vehicle = require("../models/Vehicle");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER USER

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sanitizedRole = role === "seller" ? "seller" : "buyer";

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: sanitizedRole,
    });

    res.status(201).json({

      message:
        "User registered successfully",

      user,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// LOGIN USER

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message: "Invalid credentials",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message: "Invalid credentials",

      });

    }

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      message: "Login successful",

      token,

      user,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADD TO FAVORITES

const addToFavorites = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      );

    const vehicle =
      await Vehicle.findById(
        req.params.id
      );

    if (!vehicle) {

      return res.status(404).json({

        message:
          "Vehicle not found",

      });

    }

    if (

      user.favorites.includes(
        vehicle._id
      )

    ) {

      return res.status(400).json({

        message:
          "Vehicle already in favorites",

      });

    }

    user.favorites.push(
      vehicle._id
    );

    await user.save();


    await Notification.create({

      user: vehicle.seller,

      message:
        `${req.user.name} added your vehicle to favorites`,

    });

    res.status(200).json({

      message:
        "Added to favorites",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// GET FAVORITES

const getFavorites = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).populate("favorites");

    res.status(200).json(
      user.favorites
    );

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// GET NOTIFICATIONS

const getNotifications = async (
  req,
  res
) => {

  try {

    const notifications =
      await Notification.find({

        user: req.user.id,

      }).sort({

        createdAt: -1,

      });

    res.status(200).json(
      notifications
    );

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


module.exports = {

  registerUser,

  loginUser,

  addToFavorites,

  getFavorites,

  getNotifications,

};