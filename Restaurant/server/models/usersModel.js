const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema(
  {
    userName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
