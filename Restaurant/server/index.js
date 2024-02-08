const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require("body-parser");
const port = 8080;
const DB_URL = `mongodb+srv://gd7uz3mha:aysel123@cluster0.zkehcew.mongodb.net/`;
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to db succesfully");
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
const menusSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});
const Menus = mongoose.model("Menus", menusSchema);
app.get("/menus", async (req, res) => {
  try {
    const menus = await Menus.find({});
    res.send(menus).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.get("/menus/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menus.findById(id);
    res.send(menu).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.delete("/menus/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMenu = await Menus.findByIdAndDelete(id);

    res.status(200).send(deletedMenu);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.post("/menus/", async (req, res) => {
  const newMenu = new Menus(req.body);
  try {
    await newMenu.save();
    res
      .send({
        message: "created succesfully!",
        data: newMenu,
      })
      .status(201);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.put("/menus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Menus.findByIdAndUpdate(id, req.body);
    const updatedMenu = await Menus.findById(id);
    res
      .send({
        message: "updated succesfully!",
        data: updatedMenu,
      })
      .status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.patch("/menus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Menus.findByIdAndUpdate(id, req.body);
    const updatedMenu = await Menus.findById(id);
    res
      .send({
        message: "updated succesfully!",
        data: updatedMenu,
      })
      .status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});
