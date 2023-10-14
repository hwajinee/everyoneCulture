// express
const express = require('express')
const app = express()
//ejs
app.set('view engine', 'ejs')
// req.body쓰려면 아래 두줄 필요
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'))

//path
const path = require('path');

const { MongoClient } = require('mongodb')

let connectDB = require('./db.js')
let db
connectDB.then((client)=>{
  console.log('DB연결성공')
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
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
  db.collection('program').insertOne({log: '접속 확인'})
  console.log('문화 찾기 접속 확인용 db 저장함')
});
 
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




//수정 전 코드 - 용도를 모르겠어서 삭제 안하고 주석처리 해둘게요
//
// announcement 관련 model, router 풀면 에러남 

// app.get('/api/search', (req, res) => {
//   const { query } = req.query;
//   const results = performSearch(query);
//   res.json({ results });
// });

// app.get('/api/message', (req, res) => {
//   const message = 'This is a sample message from the API.';
// res.json({ message });
// });