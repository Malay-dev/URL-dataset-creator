import express from "express";

import { use_file } from "../controllers/use_file.js";

const file_router = express.Router();
file_router.post("/", use_file);

export default file_router;
