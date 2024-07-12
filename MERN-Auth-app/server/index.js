const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");
const router = require("./routes/user");
require("dotenv").config();
const colors = require("colors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// mount path
app.use("/", router);

// connecting to database
dbConnect()

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`.magenta.inverse);
});