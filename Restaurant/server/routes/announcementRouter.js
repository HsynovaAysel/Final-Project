const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

router.get("/", announcementController.getAllAnnouncements);
router.get("/:id", announcementController.getAnnouncementById);
router.delete("/:id", announcementController.deleteAnnouncementById);
router.post("/", announcementController.addNewAnnouncement);
router.put("/:id", announcementController.updateAnnouncementById);

module.exports = router;
