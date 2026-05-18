const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Vehicle = require("../models/Vehicle");
const Order = require("../models/Order");


// CREATE CHECKOUT SESSION

const createCheckoutSession = async (req, res) => {
  try {

    const { vehicleId } = req.body;

    // FIND VEHICLE

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    // CREATE STRIPE SESSION

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: vehicle.title,
              description: vehicle.brand,
            },

            unit_amount: vehicle.price * 100,
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/payment-success`,

      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    // SAVE ORDER

    const order = await Order.create({
      user: req.user.id,
      vehicle: vehicle._id,
      amount: vehicle.price,
      stripeSessionId: session.id,
    });

    res.status(200).json({
      success: true,
      url: session.url,
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createCheckoutSession,
};