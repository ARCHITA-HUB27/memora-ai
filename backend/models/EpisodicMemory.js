const mongoose = require("mongoose");

const EpisodicSchema = new mongoose.Schema({

key: String,
value: String,
createdAt: {
type: Date,
default: Date.now
}

});

module.exports = mongoose.model("EpisodicMemory", EpisodicSchema);