import express from "express";

import { browse } from "../data_scrapper/scrape.js";

const browse_link = async (req, res, next) => {
  const { link } = req?.body;
  try {
    const resp = await browse(link);
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

const browse_router = express.Router();
browse_router.post("/", browse_link);

export default browse_router;
