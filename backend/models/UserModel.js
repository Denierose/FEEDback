const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoUrl: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    ratesGiven: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Rate",
        },
      ],
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
    ],
  },
  { timestamps: true }
);

module.exports =  mongoose.model("User", userSchema);
