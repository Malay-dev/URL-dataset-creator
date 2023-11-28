import mongoose from "mongoose";

const DataSchema = new Schema({
  url: {
    protocol: String,
    domain_name: String,
    paths: [String],
    parameters: [
      {
        name: String,
        values: [String],
      },
    ],
    fragments: [String],
  },
  top_country_shares: [
    {
      country: String,
      country_code: Number,
      value: Number,
    },
  ],
  location: String,
  global_index: Number,
  local_index: Number,
  category_rank: [
    {
      rank: Number,
      category: String,
    },
  ],
  category: String,
  traffic_sources: Object,
  engagements: {
    bounce_rate: Number,
    month: Number,
    year: Number,
    page_per_visits: Number,
    visits: Number,
    time_on_site: Number,
  },
  estimated_monthly_visits: Object,
});

const DataModel = mongoose.model("Data", DataSchema);

export default DataModel;