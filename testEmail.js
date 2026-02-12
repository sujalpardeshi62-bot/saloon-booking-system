require('dotenv').config();
const sendBookingEmail = require('./utils/sendBookingEmail');

const testBooking = {
  serviceName: "Haircut",
  price: 500,
  date: "2026-02-02",
  time: "3:00 PM",
  email: "your_real_email@gmail.com"
};

sendBookingEmail(testBooking.email, testBooking)
  .then(() => console.log("Test email sent successfully!"))
  .catch(err => console.error("Email failed:", err));
