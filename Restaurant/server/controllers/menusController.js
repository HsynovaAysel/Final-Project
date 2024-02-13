const Menus = require("../models/menusModel");

//get all menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menus.find({});
    res.send(menus).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get menu by id

const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menus.findById(id);
    res.send(menu).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete menu by id

const deletMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMenu = await Menus.findByIdAndDelete(id);
    const menus = await Menus.find({});
    
    res.status(200).json({
      message: "success",
      deleteMenu: deleteMenu,
      allMenus: menus,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new menu

const addNewMenu = async (req, res) => {
 

  const newMenu = new Menus({ ...req.body });
  try {
    await newMenu.save();
    const menus = await Menus.find({});
    res.status(201).send({
      message: "created succesfully!",
      data: newMenu,
      allMenus: menus,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    await Menus.findByIdAndUpdate(id, { ...req.body });
    const updateMenu = await Menus.findById(id);
    const menus = await Menus.find({});
    res.status(200).send({
      message: "updated succesfully!",
      data: updateMenu,
      allMenus: menus,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  deletMenuById,
  addNewMenu,
  updateMenuById,
};