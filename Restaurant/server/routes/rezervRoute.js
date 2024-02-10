const express = require("express");
const router = express.Router();
const rezervController = require("../controllers/rezervController");

router.get("/", rezervController.getAllRezervs);
router.get("/:id", rezervController.getRezervById);
router.delete("/:id", rezervController.deleteRezervById);
router.post("/", rezervController.addNewRezerv);
router.put("/:id", rezervController.updateRezervById);

module.exports = router;
