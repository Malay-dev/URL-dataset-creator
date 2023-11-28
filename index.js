import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { connect_to_rabbit_mq } from "./utility/message_queue.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const url_logger = (upperCase) => {
  if (typeof upperCase !== "boolean") {
    upperCase = true;
  }
  return (req, res, next) => {
    console.log(
      "Logging:",
      upperCase ? req.url.toUpperCase() : req.url.toLowerCase()
    );
    next();
  };
};
app.enable("trust proxy");
app.use(url_logger(true));
app.use(express.json());
app.use(express.static("public"));

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DATABASE_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@url-dataset-cluster.kfsuavg.mongodb.net/?retryWrites=true&w=majority`;

const connect_to_database = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("[server]: Connected to database..."))
    .catch((e) => {
      console.log(`[server]: ${e}`);
      setTimeout(connect_to_database, 5000);
    });
};
connect_to_database();
connect_to_rabbit_mq();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
