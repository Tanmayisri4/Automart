const Message = require("../models/Message");


// SEND MESSAGE
const sendMessage = async (req, res) => {

  try {

    const message = await Message.create({
      sender: req.user.id,
      receiver: req.body.receiver,
      vehicle: req.body.vehicle,
      text: req.body.text,
    });

    res.status(201).json(message);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET MESSAGES
const getMessages = async (req, res) => {

  try {

    const messages = await Message.find({
      vehicle: req.params.vehicleId,
    })
      .populate("sender", "name")
      .populate("receiver", "name");

    res.status(200).json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  sendMessage,
  getMessages,
};