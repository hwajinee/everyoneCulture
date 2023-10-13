const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const announcementSchema = new Schema({
  TITLE_NM: String,
  CLASS_NM: String,
  BGNG_DE: String,
  END_DE: String,
  TM: String,
  IMAGE_URL_NM: String, 
  HMPG_NM: String   
});

const Announcement = model('Announcement', announcementSchema);

module.exports = Announcement;
