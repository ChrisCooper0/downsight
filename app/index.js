import express from "express";
import runPuppeteer from "./puppeteer.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 5500;

app.use(cors());

// Handle GET requests to /messages
app.get("/messages", (req, res) => {
  console.log("Received a PUT request to /");
  // Handle the PUT request here

  // Send a response (you can customize this based on your requirements)
  res.status(200).send("Message successfully updated");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: "Website down",
  text: "Website down! Go check it out",
};

const sendFailEmail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// 09:00 every day
cron.schedule("* 9 * * *", async () => {
  const checkStatus = await runPuppeteer(process.env.WEBSITE_TO_CHECK);

  if (checkStatus === "Failed") {
    sendFailEmail();
  }

  console.log("Website check", checkStatus);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
