const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;
