import runPuppeteer from "./app/puppeteer.js";
import cron from "node-cron";
import http from "node:http";
import nodemailer from "nodemailer";
import "dotenv/config";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
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
  const checkStatus = await runPuppeteer("https://jakegifford.co.uk/");

  if (checkStatus === "Failed") {
    sendFailEmail();
  }

  console.log("Website check", checkStatus);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ 🚀`);
});
