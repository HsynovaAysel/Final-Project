const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.delete("/:id", usersController.deleteUserById);
router.post("/", usersController.addNewUser);
router.put("/:id", usersController.updateUserById);

module.exports = router;
