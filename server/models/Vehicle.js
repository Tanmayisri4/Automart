const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    kilometers: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    rating: Number,

    comment: String,
  },
],

    image: {
  type: String,
  default:
    "https://via.placeholder.com/400x250?text=No+Image",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);