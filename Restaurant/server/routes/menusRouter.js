const express = require("express");
const router = express.Router();
const menusController = require("../controllers/menusController");

router.get("/", menusController.getAllMenus);
router.get("/:id", menusController.getMenuById);
router.delete("/:id", menusController.deletMenuById);
router.post("/", menusController.addNewMenu);
router.put("/:id", menusController.updateMenuById);

module.exports = router;
