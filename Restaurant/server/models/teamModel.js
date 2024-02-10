const mongoose = require("mongoose");
const { Schema } = mongoose;
const teamSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true }
},
{ timestamps: true });

const  Team = mongoose.model("Team", teamSchema);

module.exports = Team;