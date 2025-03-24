require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();

// ✅ Fix CORS issue: Allow frontend URL dynamically
app.use(cors({
    origin: process.env.CLIENT_URL || "*", // Allow all origins for testing
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server Running on Port ${PORT}`));

// ✅ Ensure EMAIL_USER and EMAIL_PASS exist
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env file");
    process.exit(1); // Stop server if missing env variables
}

// Nodemailer configuration
const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.error("❌ Email service error:", error);
    } else {
        console.log("✅ Ready to Send Emails");
    }
});

// Contact Form API
router.post("/contact", (req, res) => {
    const { firstName, lastName, email, message, phone } = req.body;

    if (!firstName || !lastName || !email || !message || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const name = `${firstName} ${lastName}`;

    const mail = {
        from: name,
        to: process.env.EMAIL_USER,
        subject: "Contact Form Submission - Portfolio",
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone:</strong> ${phone}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            console.error("❌ Email sending error:", error);
            res.status(500).json({ error: "Email sending failed" });
        } else {
            res.json({ code: 200, status: "✅ Message Sent Successfully" });
        }
    });
});
