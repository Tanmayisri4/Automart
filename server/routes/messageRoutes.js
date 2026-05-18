const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");


// SEND MESSAGE
router.post(
  "/",
  protect,
  sendMessage
);


// GET ALL MESSAGES OF VEHICLE
router.get(
  "/:vehicleId",
  protect,
  getMessages
);

module.exports = router;