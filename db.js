const mongoose = require('mongoose');
const Announcement = require('./models/Announcement');

const mongoURI = 'mongodb://localhost:27017/notice_cuture';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    await Announcement.deleteMany();

    const announcements = [
      {
        title: "최소리의 소리를 본다(Seeing Sound)",
        class: "전시",
        startDate: new Date("2020-11-10"),
        endDate: new Date("2020-12-06")
      },
      // Add other announcements in a similar format
    ];

    await Announcement.insertMany(announcements);

    console.log('Dummy data added to MongoDB');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
});
