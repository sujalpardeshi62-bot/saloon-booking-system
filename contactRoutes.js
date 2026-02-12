const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

/**
 * POST: Save contact message
 * URL: /api/contact
 */
router.post("/contact", async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);
    await msg.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET: Get all messages (Admin)
 * URL: /api/contact
 */
router.get("/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE: Delete one message
 * URL: /api/contact/:id
 */
router.delete("/contact/:id", async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router; // 🔴 THIS LINE IS REQUIRED
/**
 * PUT: Mark message as read/unread
 * URL: /api/contacts/contact/:id
 */
router.put("/contact/:id", async (req, res) => {
  try {
    const { read } = req.body;

    const updatedMsg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: read },
      { new: true }
    );

    res.json(updatedMsg);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
