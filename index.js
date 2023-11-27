import express from "express";
import dotenv from "dotenv";

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
