const mongoose = require("mongoose");
const { Schema } = mongoose;
const menusSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true });
  const Menus = mongoose.model("Menus", menusSchema);

  module.exports = Menus;










