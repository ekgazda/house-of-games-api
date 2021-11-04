const endpoints = require("../endpoints.json");

exports.fetchAllEndpoints = async () => {
  console.log(endpoints)
  return endpoints
}