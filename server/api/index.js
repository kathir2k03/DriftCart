const app = require("../app");
const connectDatabase = require("../config/database");

connectDatabase();

module.exports = app;