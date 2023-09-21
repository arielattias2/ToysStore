require("express-async-errors"); // Using this to handle async errors (wrap each route)
const express = require("express");
const logger = require("./startup/logger");
const { deleteAll, createToys } = require("./data/toys");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`listening on port  ${port} ...`));
