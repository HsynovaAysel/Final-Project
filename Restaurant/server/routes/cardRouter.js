const express = require("express");
const router = express.Router();
const messageController = require("../controllers/cardController");

router.get("/", messageController.getAllCards);
router.get("/:id", messageController.getCardById);
router.delete("/:id", messageController.deletCardById);
router.post("/", messageController.addNewCard);
router.put("/:id", messageController.updateCardById);

module.exports = router;
