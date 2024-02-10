const Announcements = require("../models/announcementModel");

//get all Announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcements.find({});
    res.send(announcements).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get Announcement by id

const getAnnouncementById = async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcements.findById(id);
    res.send(announcement).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete Announcement by id

const deleteAnnouncementById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnnouncement = await Announcements.findByIdAndDelete(id);
    const announcements = Announcements.find({});
    res.status(200).json({
      message: "success",
      deletedAnnouncement: deletedAnnouncement,
      allAnnouncements: announcements,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//post new Announcement

const addNewAnnouncement = async (req, res) => {
  const newAnnouncement = new Announcements({ ...req.body });
  try {
    await newAnnouncement.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newAnnouncement,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// update data, put

const updateAnnouncementById = async (req, res) => {
  const { id } = req.params;
  try {
    await Announcements.findByIdAndUpdate(id, { ...req.body });
    const updatedAnnouncement = await Announcements.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncementById,
  addNewAnnouncement,
  updateAnnouncementById,
};
