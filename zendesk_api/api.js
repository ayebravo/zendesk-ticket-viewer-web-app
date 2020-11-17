const axios = require("axios");

// Make API GET request
async function makeApiRequest(targetPage) {
  const TICKETS_PER_PAGE = 25;
  let url = `https://ayelenbravo.zendesk.com/api/v2/tickets.json?per_page=${TICKETS_PER_PAGE}`;
  if (targetPage) {
    url = `https://ayelenbravo.zendesk.com/api/v2/tickets.json?page=${targetPage}&per_page=${TICKETS_PER_PAGE}`;
  }

  let response = null;

  try {
    response = await axios.get(url, {
      withCredentials: true,
      auth: {
        username: process.env.ZENDESK_USERNAME,
        password: process.env.ZENDESK_PASSWORD,
      },
    });
  } catch (error) {
    return null;
  }

  return response.data;
}

// Make API GET request for single ticket
async function getTicket(id) {
  let url = `https://ayelenbravo.zendesk.com/api/v2/tickets/${id}.json`;
  let response = null;

  try {
    response = await axios.get(url, {
      withCredentials: true,
      auth: {
        username: process.env.ZENDESK_USERNAME,
        password: process.env.ZENDESK_PASSWORD,
      },
    });
  } catch (error) {
    return null;
  }

  return response.data;
}

// Module to export functions
module.exports.makerequest = makeApiRequest;
module.exports.findticket = getTicket;
