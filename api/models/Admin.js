const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const AdminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
    default: 'Donald'
  },
  lastname: {
    type: String,
    required: false,
    default:'Essien'
  },
  email: {
    type: String,
    required: true,
    default: 'edimenzani@gmail.com',
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

AdminSchema.plugin(timestamp);

const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;
