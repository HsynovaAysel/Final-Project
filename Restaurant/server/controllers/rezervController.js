const Rezervs = require("../models/rezervModel");

//get all rezervs
const getAllRezervs = async (req, res) => {
  try {
    const rezervs = await Rezervs.find({});
    res.send(rezervs).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get rezerv by id

const getRezervById = async (req, res) => {
  const { id } = req.params;
  try {
    const rezerv = await Rezervs.findById(id);
    res.send(rezerv).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete rezerv by id

const deleteRezervById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRezerv = await Rezervs.findByIdAndDelete(id);
    // const rezervs = Rezervs.find({});
    res.status(200).json({
      message: "success",
      deletedrezerv: deletedRezerv,
      // allRezervs: rezervs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new rezerv

const addNewRezerv = async (req, res) => {
  const newRezerv = new Rezervs({ ...req.body });
  try {
    await newRezerv.save();
    // const allRezervs = Rezervs.find({});
    res.status(201).send({
      message: "created succesfully!",
      data: newRezerv,
      // allRezervs: allRezervs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateRezervById = async (req, res) => {
  const { id } = req.params;
  try {
    await Rezervs.findByIdAndUpdate(id, { ...req.body });
    const updatedRezerv = await Rezervs.findById(id);
    // const rezervs = Rezervs.find({});
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedRezerv,
      // allRezervs: rezervs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllRezervs,
  getRezervById,
  deleteRezervById,
  addNewRezerv,
  updateRezervById,
};
