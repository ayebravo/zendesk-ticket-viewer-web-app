const axios = require("axios");

// Make API GET request

async function makeApiRequest(url) {
  if (!url) {
    url = "https://ayelenbravo.zendesk.com/api/v2/tickets.json?per_page=2";
  }

  const response = await axios.get(url, {
    withCredentials: true,
    auth: {
      username: "abravo3@madisoncollege.edu",
      password: "lookFORWARD!",
    },
  });

  console.log(response.data);
  return response.data;
}

// Make API GET request for single ticket

async function getTicket(id) {
  let url = `https://ayelenbravo.zendesk.com/api/v2/tickets/${id}.json`;

  const response = await axios.get(url, {
    withCredentials: true,
    auth: {
      username: "abravo3@madisoncollege.edu",
      password: "lookFORWARD!",
    },
  });

  console.log(response.data);
  return response.data;
}

// Module to export functions

module.exports.makerequest = makeApiRequest;

module.exports.findticket = getTicket;
