import DataModel from "../schema/data_schema.js";

const store_data_database = async (url_entry) => {
  try {
    const extinguisher = await DataModel.findOne({
      "url.domain_name": url_entry.url.domain_name,
    });
    console.log("Updating the url entry...");
    if (extinguisher !== null) {
      const mergedPaths = Array.from(
        new Set([...extinguisher.url.paths, ...url_entry.url.paths])
      );
      const mergedParams = extinguisher.url.parameters.concat(
        url_entry.url.parameters.filter((newParam) => {
          return !extinguisher.url.parameters.some(
            (existingParam) =>
              existingParam.name === newParam.name &&
              existingParam.values.every((val) => newParam.values.includes(val))
          );
        })
      );
      const mergedFragments = Array.from(
        new Set([...extinguisher.url.fragments, ...url_entry.url.fragments])
      );
      const updated_entry = await DataModel.updateOne(
        { domain: url_entry.url.domain },
        {
          $set: {
            paths: mergedPaths,
            parameters: mergedParams,
            fragments: mergedFragments,
          },
        },
        { new: true }
      );
      return updated_entry;
    } else {
      console.log("Creating New entry...");
      const data = await DataModel.create(url_entry);
      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      message: error,
    };
  }
};

export { store_data_database };
