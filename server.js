// express
const express = require('express')
const app = express()

//ejs
app.set('view engine', 'ejs')

// req.body쓰려면 아래 두줄 필요
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//path
const path = require('path');

app.use(express.static(__dirname + '/public'))

const { MongoClient } = require('mongodb')

let connectDB = require('./db.js')
let db
connectDB.then((client)=>{
  // console.log('DB연결성공')
  db = client.db('everyoneCulture');

  //DB연결 성공 시, 서버 띄우기
  app.listen(8800, () =>{
    console.log('http://localhost:8800 에서 서버 실행중')
  })
}).catch((error) =>{
  console.log(error)
})

//홈
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//사이트 소개
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
 
//문화 찾기
app.use('/search', require('./routers/search.js'))

//문화 소식
app.use('/news', require('./routers/news.js'))
app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

//개발자들
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.use('/api', require('./routers/news'));

//후기 저장
app.post('/api/saveReview', async (req, res) => {
  const { title, reviewText, password } = req.body;

  try {
      const collection = db.collection('reviews');
      const result = await collection.insertOne({ title, reviewText, password });

      res.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
      //await collection.close();
  }
});
