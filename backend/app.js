require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect Database
connectToDB(); // added
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/todos", require("./routes/api/todos"));

module.exports = app;
