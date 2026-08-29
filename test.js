import axios from "axios";
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

console.log(await get_metadata("gemini.google.com"));
