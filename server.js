require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// DB connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Salon Booking Backend Running 🚀");
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
