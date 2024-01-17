import runPuppeteer from "./app/puppeteer.js";
import cron from "node-cron";

cron.schedule("0 9 * * *", async () => {
  const checkStatus = await runPuppeteer("https://jakegifford.co.uk/");

  console.log("Website check", checkStatus);
});

console.log("App running 🚀");
