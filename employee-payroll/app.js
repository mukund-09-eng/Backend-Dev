const cors = require("cors");

const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(logger);

app.use("/api/employees", employeeRoutes);

app.use(errorHandler);

module.exports = app;
