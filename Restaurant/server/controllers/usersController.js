const Users = require("../models/usersModel");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get user by id

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    res.send(user).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete user by id

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Users.findByIdAndDelete(id);
    const users = await Users.find({});
    
    res.status(200).json({
      message: "success",
      deletedUser: deletedUser,
      allUsers: users,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new user

const addNewUser = async (req, res) => {
  const newUser = new Users({ ...req.body });
  try {
    await newUser.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.findByIdAndUpdate(id, { ...req.body });
    const updatedUser = await Users.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  addNewUser,
  updateUserById,
};
