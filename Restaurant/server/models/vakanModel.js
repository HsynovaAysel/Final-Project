const mongoose = require("mongoose");
const { Schema } = mongoose;
const vakansSchema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    job: { type: String, required: true },
    city: { type: String, required: true },
    cv: { type: String, required: true },
    experience: { type: String, required: true },
  },
  { timestamps: true }
);

const Vakans = mongoose.model("Vakans", vakansSchema);

module.exports = Vakans;
