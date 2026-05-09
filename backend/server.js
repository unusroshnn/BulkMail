process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bulkmail")
 .then(()=> console.log("MongoDB connected"))
 .catch(err=> console.log(err));

 app.use("/api/emails", require("./routes/mailRoutes"));

 app.listen(5000, () => {
    console.log("Server running on port 5000");
    });