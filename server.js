require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

// Nodemailer configuration (Use environment variables)
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Fetch from .env file
    pass: process.env.EMAIL_PASS, // Fetch from .env file
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.error("Email service error:", error);
  } else {
    console.log("Ready to Send Emails");
  }
});

router.post("/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;

  if (!firstName || !lastName || !email || !message || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const name = `${firstName} ${lastName}`;

  const mail = {
    from: name,
    to: process.env.EMAIL_USER, // Use environment variable
    subject: "Contact Form Submission - Portfolio",
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "Email sending failed" });
    } else {
      res.json({ code: 200, status: "Message Sent Successfully" });
    }
  });
});
