import puppeteer from "puppeteer";

import extract_url_parts from "./extract_url_parts.js";
import { send_to_queue } from "../controllers/store_data.js";

const browser = await puppeteer.launch({
  args: ["--no-sandbox"],
  headless: "new",
  defaultViewport: null,
  userDataDir: "./tmp",
});

let found_links = [];

const is_valid = (link) => {
  try {
    new URL(link);
    return true;
  } catch (error) {
    return false;
  }
};

const browse = async (url) => { 
  const page = await browser.newPage();
  await page.goto(url);

  // Wait for the page to load completely
  await page.waitForSelector("a");

  // Extracting links from the page
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    return anchors.map((anchor) => anchor.href.trim());
  });

  for (const link of links) {
    if (!found_links.includes(link) && is_valid(link)) {
      found_links.push(link);
      const response = send_to_queue(extract_url_parts(link));
      console.log(response);
      await browse(link);
    }
  }
};

export { browse };
