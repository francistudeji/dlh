const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const DictionarySchema = new mongoose.Schema({
  englishWord: {
    type: String,
    required: true
  },
  ibibioWord: {
    type: String,
    required: true
  }
});

DictionarySchema.plugin(timestamp);

const Dictionary = mongoose.model("Dictionary", DictionarySchema);
module.exports = Dictionary;
