const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nabanitabardhan724@gmail.com",
    pass: "ourvsoihowqjjsbm"
  }
});

const sendMail = async (name, email, message) => {
  const info = await transporter.sendMail({
    from: `"Contact Form" <nabanitabardhan724@gmail.com>`, // ✅ must be your email
    to: "nabanitabardhan724@gmail.com",                   // ✅ your inbox
    replyTo: email,                                       // ✅ user's email
    subject: `New message from ${name}`,
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `
  });

  console.log("MAIL SENT:", info.messageId);
};

module.exports = sendMail;