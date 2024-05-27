import express from "express";

import { use_list } from "../controllers/use_list.js";

const list_router = express.Router();
list_router.post("/", use_list);

export default list_router;
