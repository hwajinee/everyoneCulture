const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://user:user1234@cluster0.60xu7q2.mongodb.net/?retryWrites=true&w=majority'
let connectDB = new MongoClient(url).connect()

module.exports = connectDB


//수정 전 코드
// const mongoose = require('mongoose');
// const Announcement = require('./models/Announcement');

// const mongoURI = 'mongodb://localhost:27017/notice_cuture';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', async () => {
//   try {
//     await Announcement.deleteMany();

//     const announcements = [
//       {
//         TITLE_NM: "최소리의 소리를 본다(Seeing Sound)",
//         CLASS_NM: "전시",
//         BGNG_DE: "2020-11-10",
//         END_DE: "2020-12-06",
//         TM: "10:00 - 18:00",
//         IMAGE_URL_NM: "https://ggc.ggcf.kr/uploadimg/file/전시_02_1604989131763.jpg",
//         HMPG_NM: "https://www.hcf.or.kr/"
//       },
//       // Add other announcements in a similar format
//     ];

//     await Announcement.insertMany(announcements);

//     console.log('Dummy data added to MongoDB');
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// });
