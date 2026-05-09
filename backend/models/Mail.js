const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
    subject: String,
    body: String,
    recipients:[String],
    status: String,
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Mail", mailSchema);