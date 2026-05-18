const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: {
  type: String,
  enum: ["buyer", "seller", "admin"],
  default: "buyer",
},
favorites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
],
});

module.exports = mongoose.model("User", userSchema);