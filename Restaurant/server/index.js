const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const menusRouter = require("./routes/menusRouter");
const rezervRouter = require("./routes/rezervRoute");
const usersRouter = require("./routes/usersRoute");
const messagesRouter = require("./routes/messageRoute");

const DB_URL = `mongodb+srv://gd7uz3mha:aysel123@cluster0.zkehcew.mongodb.net/`;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/menus", menusRouter);
app.use("/rezervs", rezervRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
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
