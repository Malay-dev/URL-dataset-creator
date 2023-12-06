import axios from "axios";

import { publish_to_queue } from "../utility/message_queue.js";

const get_metadata = async (domain) => {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "Cache-Control": "max-age=0",
  };
  const params = {
    domain: domain,
  };
  const data_endpoint = "https://data.similarweb.com/api/v1/data";
  const res = await axios.get(data_endpoint, {
    headers: headers,
    params: params,
  });
  return res.data;
};

const send_to_queue = async (url_data) => {
  try {
    const res_data = await get_metadata(url_data?.domain_name);

    const metadata = {
      top_country_shares: res_data?.TopCountryShares?.map((countryShare) => ({
        country: countryShare?.Country,
        country_code: countryShare?.CountryCode,
        value: countryShare?.Value,
      })),
      location: res_data?.CountryRank?.CountryCode,
      global_index: res_data?.GlobalRank?.Rank,
      local_index: res_data?.CountryRank?.Rank,
      category_rank: res_data?.CategoryRank,
      category: res_data?.Category,
      traffic_sources: res_data?.TrafficSources,
      engagements: {
        bounce_rate: res_data?.Engagements?.BounceRate,
        month: res_data?.Engagements?.Month,
        year: res_data?.Engagements?.Year,
        page_per_visits: res_data?.Engagements?.PagePerVisits,
        visits: res_data?.Engagements?.Visits,
        time_on_site: res_data?.Engagements?.TimeOnSite,
      },
      estimated_monthly_visits: res_data?.EstimatedMonthlyVisits,
    };
    const complete_data = { url: url_data, metadata };
    const data = await publish_to_queue(complete_data);

    return {
      status: "success",
      message: "URL data published to queue",
      result: complete_data,
    };
  } catch (error) {
    console.log(error);
    return { status: "failed", error: error };
  }
};

export { send_to_queue };
