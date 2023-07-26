const mongoose = require("mongoose");
const adSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },

  Website: {
    type: String,
  },

  Description: {
    type: String,
  },
  image: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const AdModel = mongoose.model("Ad", adSchema);
module.exports = AdModel;
