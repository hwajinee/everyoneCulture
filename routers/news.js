const router = require('express').Router()
let connectDB = require('../db.js')

let db
connectDB.then((client)=>{
  // console.log('news.js => DB연결성공')
  db = client.db('everyoneCulture');
}).catch((err)=>{
  console.log(err)
})

router.get('/announcements', async (req, res) => {
  try {
    const collection = db.collection('news');
    const announcements = await collection.find().toArray();

    // client.close();
    res.json({ announcements });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router