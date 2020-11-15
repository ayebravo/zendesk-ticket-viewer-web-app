const express = require("express");
const router = express.Router();
const zendeskApi = require("../zendesk_api/api");

// Find ticket
router.post("/", async (request, response) => {
  let id = request.body.ticketId;
  let data = await zendeskApi.findticket(id);

  response.render("../views/singleticket", {
    data,
  });
});

module.exports = router;
