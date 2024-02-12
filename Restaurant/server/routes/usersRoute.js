const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.getAllUsers);
router.get("/users/:id", usersController.getUserById);
router.delete("/users/:id", usersController.deleteUserById);
router.post("/users", usersController.addNewUser);
router.put("/users/:id", usersController.updateUserById);
router.post("/signUp", usersController.signUp);
router.post("/signIn", usersController.signIn);

module.exports = router;
