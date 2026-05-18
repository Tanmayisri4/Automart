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
app.use(cors());

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