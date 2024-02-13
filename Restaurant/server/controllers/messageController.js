const Messages = require("../models/messageModel");

//get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Messages.find({});
    res.send(messages).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get message by id

const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Messages.findById(id);
    res.send(message).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete message by id

const deletMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMessage = await Messages.findByIdAndDelete(id);
    const messages = await Messages.find({});
    
    res.status(200).json({
      message: "success",
      deleteMessage: deleteMessage,
      allMessages: messages,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new message

const addNewMessage = async (req, res) => {
 

  const newMessage = new Messages({ ...req.body });
  try {
    await newMessage.save();
    const messages = await Messages.find({});
    res.status(201).send({
      message: "created succesfully!",
      data: newMessage,
      allMessages: messages,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    await Messages.findByIdAndUpdate(id, { ...req.body });
    const updateMessage = await Messages.findById(id);
    const messages = await Messages.find({});
    res.status(200).send({
      message: "updated succesfully!",
      data: updateMessage,
      allMessages: messages,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  deletMessageById,
  addNewMessage,
  updateMessageById,
};