const Cards = require("../models/cardModel");

//get all Cards
const getAllCards = async (req, res) => {
  try {
    const cards = await Cards.find({});
    res.send(cards).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get Card by id

const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const Card = await Cards.findById(id);
    res.send(Card).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete Card by id

const deletCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCard = await Cards.findByIdAndDelete(id);
    const cards = await Cards.find({});
    
    res.status(200).json({
      message: "success",
      deleteCard: deleteCard,
      // allCards: cards,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new Card

const addNewCard = async (req, res) => {
 

  const newCard = new Cards({ ...req.body });
  try {
    await newCard.save();
    const cards = await Cards.find({});
    res.status(201).send({
      Card: "created succesfully!",
      data: newCard,
      // allCards: cards,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateCardById = async (req, res) => {
  const { id } = req.params;
  try {
    await Cards.findByIdAndUpdate(id, { ...req.body });
    const updateCard= await Cards.findById(id);
    const cards = await Cards.find({});
    res.status(200).send({
      Card: "updated succesfully!",
      data: updateCard,
      // allCard: cards,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  deletCardById,
  addNewCard,
  updateCardById,
};