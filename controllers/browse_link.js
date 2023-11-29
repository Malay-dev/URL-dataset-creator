import express from "express";

import { browse } from "../data_scrapper/scrape.js";

const browse_link = async (req, res, next) => {
  const { link } = req?.body;
  browse(link);
};

const browse_router = express.Router();
browse_router.post("/", browse_link);

export default browse_router;
