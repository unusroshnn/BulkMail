const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

// ✅ Email validation
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ✅ Send Mail
router.post("/send", async (req, res) => {
  const { subject, body, recipients } = req.body;

  // ✅ Validation
  if (!subject || !body || !recipients || recipients.length === 0) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // ✅ Filter valid emails
  const validRecipients = recipients.filter(isValidEmail);

  if (validRecipients.length === 0) {
    return res.status(400).json({
      error: "No valid email addresses",
    });
  }

  try {
    // ✅ Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "unusroshan95@gmail.com",
        pass: "eahd uded vdue feio",
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    // ✅ Batch sending
    const batchSize = 5;

    for (let i = 0; i < validRecipients.length; i += batchSize) {
      const batch = validRecipients.slice(i, i + batchSize);

      await Promise.all(
        batch.map((email) =>
          transporter.sendMail({
            from: "unusroshan95@gmail.com",
            to: email,
            subject: subject,
            text: body,
          })
        )
      );
    }

    // ✅ Save success in MongoDB
    await Mail.create({
      subject,
      body,
      recipients: validRecipients,
      status: "SUCCESS",
    });

    res.status(200).json({
      message: "Emails sent successfully",
    });

  } catch (err) {
    console.error("Mail Error:", err);

    // ✅ Save failed status
    await Mail.create({
      subject,
      body,
      recipients,
      status: "FAILED",
    });

    res.status(500).json({
      error: err.message,
    });
  }
});

// ✅ Get Mail History
router.get("/history", async (req, res) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 });

    res.json(mails);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;