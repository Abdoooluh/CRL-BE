const express = require("express");
const createAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const emailRouter = express.Router();

const emailHandler = createAsyncHandler(async (req, res) => {
  console.log("post api called")
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "CreditRiskLiaison@gmail.com",
      pass: "CRL12345678",
    },
  });

  const mailOptions = {
    from: "CreditRiskLiaison@gmail.com",
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info);

  res.status(200).json({ message: "Email sent successfully" });
});

emailRouter.post("/send-email", emailHandler);

const emailInformation = {
  email: [
    {
      route: "mail/send-email [POST]",
      desc: "send an email to the specified address",
    },
  ],
};
const mailerAPIs = { info: emailInformation, router: emailRouter };
module.exports = mailerAPIs;
