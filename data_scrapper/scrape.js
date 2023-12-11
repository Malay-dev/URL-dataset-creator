import puppeteer from "puppeteer";

import extract_url_parts from "./extract_url_parts.js";
import { send_to_queue } from "../controllers/send_data.js";

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
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
      defaultViewport: null,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("a");

    // Extracting links from the page
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a"));
      return anchors.map((anchor) => anchor.href.trim());
    });
    console.log(links);
    for (const link of links) {
      if (!found_links.includes(link) && is_valid(link)) {
        found_links.push(link);
        const response = await send_to_queue(extract_url_parts(link));
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    await browser.close();
    return {
      status: "success",
      message: "Completed crawling through this page...",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      message: error,
    };
  }
};

export { browse };
