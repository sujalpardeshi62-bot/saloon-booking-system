const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Service = require("../models/Service");
const { sendConfirmEmail, sendCancelEmail } = require("../utils/sendBookingEmail");


// =======================
// USER: Create booking
// =======================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, serviceId, date, time } = req.body;

    // basic validation
    if (!name || !email || !serviceId || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // fetch service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = new Booking({
      name,
      email,
      phone,
      serviceId: service._id,
      serviceName: service.name,
      price: service.price,
      date,
      time
    });

    await booking.save();
    res.status(201).json(booking);

  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
});


// =======================
// ADMIN: Get all bookings
// =======================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


// =======================
// ADMIN: Confirm booking
// =======================
router.put("/confirm/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Confirmed";
    await booking.save();

    await sendConfirmEmail(booking.email, booking);

    res.json({ success: true, message: "Booking confirmed & email sent" });

  } catch (error) {
    console.error("Confirm booking error:", error);
    res.status(500).json({ success: false, message: "Confirm email failed" });
  }
});


// =======================
// ADMIN: Cancel booking
// =======================
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Cancelled";
    await booking.save();

    await sendCancelEmail(booking.email, booking);

    res.json({ success: true, message: "Booking cancelled & email sent" });

  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ success: false, message: "Cancel email failed" });
  }
});


// =======================
// ADMIN: Update booking status (keep last)
// =======================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
