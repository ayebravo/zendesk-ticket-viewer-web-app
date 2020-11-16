const url = require("url");
const moment = require("moment");

// Import express library for web server
const express = require("express");
let exphbs = require("express-handlebars");

// Import file with API
const zendeskApi = require("./zendesk_api/api");

// Create instance of express
const app = express();

// Handlebars template engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      hasNoValue: (value) => {
        return !value;
      },
      formatDate: (value) => {
        let formattedDate = moment(value).format("lll");
        return formattedDate;
      },
    },
  })
);
app.set("view engine", "handlebars");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes (routes: webpages)
app.get("/", (request, response) => {
  response.render("menu");
});

// Function to help next and previous pages
function getPageLink(pageUrl) {
  let pageLink = "";
  if (pageUrl) {
    let parsedUrl = url.parse(pageUrl, true);
    if (parsedUrl && parsedUrl.query) {
      pageLink = `?page=${parsedUrl.query.page}`;
    }
  }
  return pageLink;
}

// Handle view of all tickets page
app.get("/alltickets", async (request, response) => {
  let targetPage = null;
  if (request && request.query) {
    targetPage = request.query.page;
  }

  let data = await zendeskApi.makerequest(targetPage);

  let nextSearch = getPageLink(data.next_page);
  let previousSearch = getPageLink(data.previous_page);

  response.render("alltickets", {
    data,
    next: nextSearch,
    previous: previousSearch,
  });
});

// Handle view of single ticket page
app.get("/singleticket", (request, response) => {
  response.render("singleticket");
});

// Route to show single ticket
app.use("/internal_api/searchticket", require("./internal_api/searchticket"));

// Port to listen on to server webpage
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Port: ${PORT}`));
