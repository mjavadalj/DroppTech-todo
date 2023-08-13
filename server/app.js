const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");
const DBService = require("./api/services/DBService");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

DBService.DBConnection();
DBService.BuildRelations();
app.use("/api", router);

module.exports = app;
