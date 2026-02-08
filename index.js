const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins (for development purposes
  }),
);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mavinash422@gmail.com",
    pass: "yjrw ofgv zlfm qkau",
  },
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Email sending route
app.post("/api/email", async (req, res) => {
  try {
    const { email, body, subject, priority, category } = req.body;

    if (!email || !body || !subject) {
      return res
        .status(400)
        .json({ error: "Email, body, and subject are required" });
    }

    let emailText = body;
    if (priority || category) {
      emailText += "\n\n---\n";
      if (priority) emailText += `Priority: ${priority}\n`;
      if (category) emailText += `Category: ${category}\n`;
    }

    const mailOptions = {
      from: "mavinash422@gmail.com",
      to: email,
      subject: subject,
      text: emailText,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Email Service API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
