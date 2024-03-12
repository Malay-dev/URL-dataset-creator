import { send_to_queue } from "./send_data.js";
import extract_url_parts from "../data_scrapper/extract_url_parts.js";
const use_file = async (req, res) => {
  let data = req.body;
  data = data.slice(460000, 500000 + 1);
  try {
    for (var index in data) {
      let url = data[index].url;
      const url_obj = extract_url_parts(url);
      await send_to_queue(url_obj);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return res.status(200).send({ message: "File parsed successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Invalid JSON file." });
  }
};

export { use_file };
