const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.getAllMessages);
router.get("/:id", messageController.getMessageById);
router.delete("/:id", messageController.deletMessageById);
router.post("/", messageController.addNewMessage);
router.put("/:id", messageController.updateMessageById);

module.exports = router;
