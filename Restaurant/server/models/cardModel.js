const mongoose = require("mongoose");
const { Schema } = mongoose;
const cardSchema = new Schema(
  {
    cardHolder: { type: String, required: true },
    cardMonth: { type: String, required: true },
    cardYear: { type: String, required: true },
    cardCvv: { type: String, required: true },
    cardNumber: { type: String, required: true },
  },
  { timestamps: true }
);
const Cards = mongoose.model("Cards", cardSchema);

module.exports = Cards;
