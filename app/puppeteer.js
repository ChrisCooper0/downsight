import puppeteer from "puppeteer";

const runPuppeteer = async (url) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "false", slowMo: 250 });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Perform check for specific text on page
  let check = null;

  try {
    check = "Successful";
    await page.waitForXPath(
      `//*[contains(text(), "${process.env.TEXT_TO_CHECK}")]`
    );
  } catch (e) {
    check = "Failed";
  }

  await browser.close();

  return check;
};

export default runPuppeteer;
