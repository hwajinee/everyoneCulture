const router = require('express').Router()

let connectDB = require('../db.js')

let db
connectDB.then((client)=>{
  console.log('search.js => DB연결성공')
  db = client.db('everyoneCulture');
}).catch((err)=>{
  console.log(err)
})

//프로그램 데이터는 programDB에 저장
//예시 : db.collection('program').insertOne({제목: '내용'})

router.get('/detail', (req, resp) => {
  resp.send("프로그램 상세페이지입니다.")
})


module.exports = router