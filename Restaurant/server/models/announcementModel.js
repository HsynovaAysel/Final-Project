const mongoose = require("mongoose");
const { Schema } = mongoose;
const announcementsSchema = new Schema(
  {
    job: { type: String, required: true },
    salary: { type: String, required: true },
    hours: { type: String, required: true },
    city: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: String, required: true },
  },
  { timestamps: true }
);
const Announcements = mongoose.model("Announcements", announcementsSchema);

module.exports = Announcements;
