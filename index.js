import runPuppeteer from "./app/puppeteer.js";
import cron from "node-cron";
import http from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

cron.schedule("0 9 * * *", async () => {
  const checkStatus = await runPuppeteer("https://jakegifford.co.uk/");

  console.log("Website check", checkStatus);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ 🚀`);
});
