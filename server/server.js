require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const vehicleRoutes = require("./routes/vehicleRoutes");

const adminRoutes = require("./routes/adminRoutes");

const messageRoutes = require("./routes/messageRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      const isAllowedOrigin =
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith(".vercel.app");

      if (isAllowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Origin not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/payments", paymentRoutes);

// TEST ROUTE
app.get("/", (req, res) => {

  res.send("API Running");

});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});