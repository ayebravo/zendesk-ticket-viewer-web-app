// Import express library for web server
const express = require("express");
let exphbs = require("express-handlebars");

// Import file with API

const zendeskApi = require("./zendesk_api/api");

// Create instance of express
const app = express();

// Handlebars template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes (routes: webpages)
app.get("/", (request, response) => {
  response.render("menu");
});

app.get("/alltickets", async (request, response) => {
  let data = await zendeskApi.makerequest();
  console.log(data);

  response.render("alltickets", {
    data,
  });
});

app.get("/singleticket", (request, response) => {
  response.render("singleticket");
});

// Route to show single ticket

app.use("/internal_api/searchticket", require("./internal_api/searchticket"));

// Port to listen on to server webpage
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Port: ${PORT}`));
