const Team= require("../models/teamModel");

//get all team
const getAllTeam = async (req, res) => { 
  try {
    const team = await Team.find({});
    res.send(team).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get team by id

const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id);
    res.send(team).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete team by id

const deleteTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    const team = await Team.find({});
    
    res.status(200).json({
      message: "success",
      deletedTeam: deletedTeam,
      allTeams: team,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new team

const addNewTeam = async (req, res) => {
  const newTeam = new Team({ ...req.body });
  try {
    await newTeam.save();
    const team = await Team.find({});
    res.status(201).send({
      message: "created succesfully!",
      data: newTeam,
      allTeams: team,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    await Team.findByIdAndUpdate(id, { ...req.body });
    const updatedTeam = await Team.findById(id);
    const team = await Team.find({});
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedTeam,
      allTeams: team,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllTeam,
  getTeamById,
  deleteTeamById,
  addNewTeam,
  updateTeamById,
};
