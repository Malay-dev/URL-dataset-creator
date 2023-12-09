import DataModel from "../schema/data_schema.js";

const get_all_urls = async (req, res, next) => {
  try {
    const URL_Data = await DataModel.find();
    res.status(200).json({
      status: "success",
      result: URL_Data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

export { get_all_urls };
