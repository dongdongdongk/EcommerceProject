const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text:{
      type: String,
    },
    sender: {
      type: String,
    },
    images: [
     {
        type: String,
        default : "kakaoAvatar.jpg"
     }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);