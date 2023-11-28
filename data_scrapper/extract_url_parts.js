const extract_url_parts = (url) => {
  const urlObject = new URL(url);
  const protocol = urlObject.protocol;
  const domain_name = urlObject.hostname;
  const path = urlObject.pathname;
  const fragments = urlObject.hash;

  // Extract parameters
  const params = {};
  for (const [key, value] of urlObject.searchParams.entries()) {
    if (!params[key]) params[key] = [];
    params[key].push(value);
  }
  const parameters = Object.entries(params).map(([name, values]) => ({
    name,
    values,
  }));

  return {
    protocol,
    domain_name,
    path,
    parameters,
    fragments,
  };
};

export default extract_url_parts;
