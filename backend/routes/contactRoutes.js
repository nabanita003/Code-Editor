const express = require("express");
const router = express.Router();
const sendMail = require("../utils/mailer");

router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ success: false, msg: "All fields required" });
    }

    await sendMail(name, email, message);

    return res.json({
      success: true,
      msg: "Email sent successfully!"
    });

  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      msg: "Failed to send email"
    });
  }
});

module.exports = router;