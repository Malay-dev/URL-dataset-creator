import puppeteer from "puppeteer";

import extract_url_parts from "./extract_url_parts.js";

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: null,
  userDataDir: "./tmp",
});

let found_links = [];
let url_data = [];

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

  console.log(`Links found at ${url}:`);
  console.log(links);
  for (const link of links) {
    if (!found_links.includes(link) && is_valid(link)) {
      found_links.push(link);
      url_data.push(extract_url_parts(link));
      await browse(link);
    }
    console.log(url_data);
  }
};
