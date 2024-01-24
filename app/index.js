import express from "express";
import cron from "node-cron";
import "dotenv/config";
import cors from "cors";
import runPuppeteer from "./puppeteer.js";
import sendFailEmail from "./nodemailer.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 09:00 every day
cron.schedule("* 9 * * *", async () => {
  const checkStatus = await runPuppeteer(process.env.WEBSITE_TO_CHECK);

  if (checkStatus === "Failed") {
    sendFailEmail();
  }

  console.log("Website check", checkStatus);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
