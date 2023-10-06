const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    imgUrl: {
        type: String,
        required: true, 
    },
    title: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    rating: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Rate",
        },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
