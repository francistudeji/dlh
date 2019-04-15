const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const PoetrySchema = new mongoose.Schema({
  poetryTitle: {
    type: String,
    required: true
  },
  poetrySubtitle: {
    type: String,
    required: true
  },
  poetryFindings: {
    type: String,
    required: true
  }
});

PoetrySchema.plugin(timestamp);

const Poetry = mongoose.model("Poetry", PoetrySchema);
module.exports = Poetry;
