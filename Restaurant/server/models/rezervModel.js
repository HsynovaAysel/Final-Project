//RESERVATİON
const mongoose = require("mongoose");
const { Schema } = mongoose;
const rezervSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    phone: { type: String, required: true },
    person: { type: String, required: true },
  },
  { timestamps: true }
);

const Rezervs = mongoose.model("Rezervs", rezervSchema);

module.exports = Rezervs;
