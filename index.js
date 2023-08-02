// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// date API endpoint
app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  let timeStamp = null;

  if (!inputDate) {
    timeStamp = new Date();
  } else if (!isNaN(inputDate)) {
    timeStamp = new Date(parseInt(inputDate));
  } else {
    timeStamp = new Date(inputDate);
  }

  return res.json({
    unix: timeStamp.getTime(),
    utc: timeStamp.toUTCString(),
  });
});

// listen for requests :)
app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
