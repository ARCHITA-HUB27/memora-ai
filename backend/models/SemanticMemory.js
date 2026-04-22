const mongoose = require("mongoose");

const SemanticSchema = new mongoose.Schema({
topic:String,
createdAt:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model("SemanticMemory",SemanticSchema);