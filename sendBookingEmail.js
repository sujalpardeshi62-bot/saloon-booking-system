const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ✅ CONFIRM BOOKING EMAIL */
const sendConfirmEmail = async (to, booking) => {
  await transporter.sendMail({
    from: `"Salon Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Booking Confirmed ✅ | Salon Appointment",
    html: `
      <h2>Booking Confirmed 🎉</h2>
      <p>Dear <b>${booking.name}</b>,</p>

      <p>Your appointment has been <b>successfully confirmed</b>.</p>

      <hr/>

      <p><b>Service:</b> ${booking.serviceName}</p>
      <p><b>Date:</b> ${booking.date}</p>
      <p><b>Time:</b> ${booking.time}</p>
      <p><b>Price:</b> ₹${booking.price}</p>

      <hr/>

      <p>⏰ Please arrive <b>5 minutes early</b>.</p>
      <p>If you are late by more than 10 minutes, your booking may be cancelled.</p>

      <br/>
      <p>Thank you for choosing our salon 💇‍♂️</p>
      <p><b>Salon Team</b></p>
    `
  });
};

/* ❌ CANCEL BOOKING EMAIL */
const sendCancelEmail = async (to, booking) => {
  await transporter.sendMail({
    from: `"Salon Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Booking Cancelled ❌ | Salon Appointment",
    html: `
      <h2>Booking Cancelled</h2>
      <p>Dear <b>${booking.name}</b>,</p>

      <p>We regret to inform you that your booking has been <b>cancelled</b>.</p>

      <hr/>

      <p><b>Service:</b> ${booking.serviceName}</p>
      <p><b>Date:</b> ${booking.date}</p>
      <p><b>Time:</b> ${booking.time}</p>

      <hr/>

      <p>If this was a mistake, please contact us to rebook.</p>

      <br/>
      <p>Sorry for the inconvenience 🙏</p>
      <p><b>Salon Team</b></p>
    `
  });
};

module.exports = {
  sendConfirmEmail,
  sendCancelEmail
};
