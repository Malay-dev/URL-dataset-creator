import express from "express";
import browse_link from "../controllers/browse_link.js";
import { get_all_urls } from "../controllers/get_data.js";

const browse_router = express.Router();
browse_router.post("/", browse_link);
browse_router.get("/url_data", get_all_urls);
export default browse_router;
