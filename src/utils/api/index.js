// import parser from "./node_modules/xml2json";

// const xmlToJson = xml => {
//   return parser.toJson(xml);
// };

/**
 * Generates a URI encoded query string
 *
 * @param {Object} params
 * @return {String}
 */
const getQueryString = params => {
  if (!params) {
    return "";
  }

  const queries = Object.keys(params);

  return `?${queries
    .map(
      query =>
        `${encodeURIComponent(query)}=${encodeURIComponent(params[query])}`,
    )
    .join("&")}
    `;
};

export { getQueryString };
