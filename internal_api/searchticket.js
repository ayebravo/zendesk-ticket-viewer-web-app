const express = require("express");
const router = express.Router();
const zendeskApi = require("../zendesk_api/api");

// Find ticket
router.post("/", async (request, response) => {
  let id = request.body.ticketId; // user input is just a string, e.g. "3"

  if (request && request.body && !request.body.ticketId) {
    response.render("../views/singleticket");
    return;
  }
  let data = await zendeskApi.findticket(id); //output from zendesk api. This is a complex object; it looks like data.ticket.id

  if (!data || !data.ticket) {
    response.render("../views/singleticket", {
      error_message:
        "There is no ticket with the entered ID. Please try again.",
    });

    return;
  }
  // App expects Zendesk to provide a ticket object when we ask for one by an ID.
  //If there is no ticket object, then we probably asked for a ticket that doesn't exist

  response.render("../views/singleticket", {
    data,
  });
});

module.exports = router;
