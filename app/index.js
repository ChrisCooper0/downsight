import express from "express";
import runPuppeteer from "./puppeteer.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

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
cron.schedule("* * * * *", async () => {
  const checkStatus = await runPuppeteer(process.env.WEBSITE_TO_CHECK);

  if (checkStatus === "Failed") {
    sendFailEmail();
  }

  console.log("Website check", checkStatus);
});

const checkStatus = await runPuppeteer(process.env.WEBSITE_TO_CHECK);

if (checkStatus === "Failed") {
  sendFailEmail();
}

console.log("Website check", checkStatus);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
