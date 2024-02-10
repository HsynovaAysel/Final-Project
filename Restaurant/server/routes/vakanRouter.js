const express = require("express");
const router = express.Router();
const vakansController = require("../controllers/vakanController");

router.get("/", vakansController.getAllVakans);
router.get("/:id", vakansController.getVakanById);
router.delete("/:id", vakansController.deleteVakanById);
router.post("/", vakansController.addNewVakan);
router.put("/:id", vakansController.updateVakanById);

module.exports = router;
