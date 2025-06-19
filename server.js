const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Serve static files from the public directory
app.use('/public', express.static('public'));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Keploy API Server application." });
});

// include product routes
require("./routes/product.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
