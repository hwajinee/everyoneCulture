const express = require('express');
const router = express.Router();
const Announcement = require('./models/Announcement'); 



router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json({ announcements });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
