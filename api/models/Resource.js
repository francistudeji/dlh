const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  langfile: {
    type: String,
    required: true
  }
});

ResourceSchema.plugin(timestamp);

const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = Resource;
