const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/* 1. ACTIVE services (Booking page) */
router.get("/active/list", async (req, res) => {
  const services = await Service.find({ status: "active" });
  res.json(services);
});

/* 2. Get ALL services (Admin Panel) */
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

/* 3. Get SINGLE service */
router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.json(service);
});

/* 4. ADD new service */
router.post("/", async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
});

/* 5. UPDATE service */
router.put("/:id", async (req, res) => {
  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* 6. DELETE service */
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});

module.exports = router;
