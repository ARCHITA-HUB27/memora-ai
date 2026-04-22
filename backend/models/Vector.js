const mongoose = require("mongoose");

const VectorSchema = new mongoose.Schema({

text: String,
embedding: [Number]

});

module.exports = mongoose.model("Vector", VectorSchema);