import puppeteer from "puppeteer";

const runPuppeteer = async (url) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Perform check for specific text on page
  let check = null;

  if (
    (await page.waitForXPath(
      '//*[contains(text(), "Researcher, Writer, Storyteller")]',
      30000
    )) !== null
  ) {
    check = await page.evaluate(
      (el) => el.innerText,
      await page.$x('//*[contains(text(), "Researcher, Writer, Storyteller")]')
    );
    check = "Successful";
  } else {
    check = "Failed";
  }

  await browser.close();

  return check;
};

export default runPuppeteer;
