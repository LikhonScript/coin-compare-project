const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
  },
  Website: {
    type: String,
  },
  maxSupply: {
    type: Number,
  },
  totalSupply: {
    type: Number,
    default: 0,
  },
  Image: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  contractAddress: {
    type: String,
  },
  description: {
    type: String,
  },
  explorer: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },

  noOfReviews: {
    type: Number,

    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
