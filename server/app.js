const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");
const DBService = require("./api/services/DBService");
const passport = require("passport");
const { applyPassportStrategy } = require("./api/services/PassportService");

app.use(cors());
applyPassportStrategy(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

DBService.DBConnection();
DBService.BuildRelations();
app.use("/api", router);

module.exports = app;
