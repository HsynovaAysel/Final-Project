const mongoose = require("mongoose");
const { Schema } = mongoose;
const teamSchema = new Schema({
  userJob: { type: String, required: true },
  userName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
},
{ timestamps: true });

const  Team = mongoose.model("Team", teamSchema);

module.exports = Team;