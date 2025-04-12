const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  region: String,
});

module.exports = mongoose.model("Officer", OfficerSchema);
