require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

const [name, email, phone, password] = process.argv.slice(2);

if (!name || !email || !password) {
  console.log("Usage: node createAdmin.js <name> <email> <phone?> <password>");
  console.log("Example: node createAdmin.js \"Admin User\" admin@example.com 1234567890 Secret123");
  process.exit(1);
}

const createAdmin = async () => {
  try {
    // Connect using the default options for the current mongoose version
    await mongoose.connect(MONGO_URI);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("A user with that email already exists:", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      phone: phone || "",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message || error);
    process.exit(1);
  }
};

createAdmin();
