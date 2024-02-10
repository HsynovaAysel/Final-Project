const Vakans = require("../models/vakanModel");

//get all vakans
const getAllVakans = async (req, res) => {
  try {
    const vakans = await Vakans.find({});
    res.send(vakans).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get vakan by id

const getVakanById = async (req, res) => {
  const { id } = req.params;
  try {
    const vakan = await Vakans.findById(id);
    res.send(vakan).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete vakan by id

const deleteVakanById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVakan = await Vakans.findByIdAndDelete(id);
    const vakans = await Vakans.find({});
    
    res.status(200).json({
      message: "success",
      deletedVakan: deletedVakan,
      allVakans: vakans,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new vakan

const addNewVakan = async (req, res) => {
  const newVakan = new Vakans({ ...req.body });
  try {
    await newVakan.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newVakan,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateVakanById = async (req, res) => {
  const { id } = req.params;
  try {
    await Vakans.findByIdAndUpdate(id, { ...req.body });
    const updatedVakan = await Vakans.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedVakan,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllVakans,
  getVakanById,
  deleteVakanById,
  addNewVakan,
  updateVakanById,
};
