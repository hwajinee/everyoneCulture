const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const announcementSchema = new Schema({
  id: Number,
  title: String,
  content: String
});

const Announcement = model('Announcement', announcementSchema);

module.exports = Announcement;
