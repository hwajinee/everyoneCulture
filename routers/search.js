const router = require('express').Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//fs
const fs = require('fs');

//path
const path = require('path');

let connectDB = require('../db.js');
// const { errors } = require('undici-types');

let db
connectDB.then((client)=>{
  // console.log('search.js => DB연결성공')
  db = client.db('everyoneCulture');
}).catch((err)=>{
  console.log(err)
})

router.get('/',async(req, resp) => {
  if(req.query.keyword){
    let searchKeyword = req.query.keyword
    let result = await db.collection('program').find({title : { $regex : searchKeyword} }).toArray() 
    resp.render('../views/search.ejs', { 리스트 : result })
  }else {
    let result = await db.collection('program').find().toArray() 
    resp.render('../views/search.ejs', { 리스트 : result })
  }
});

router.post('/', async(req, res) => {
  let selectedLocations = Array.isArray(req.body.gyeonggi) ? req.body.gyeonggi : [req.body.gyeonggi];
  let selectedEvents =  Array.isArray(req.body.event) ? req.body.event : [req.body.event];
 console.log(selectedEvents)
 console.log(selectedLocations)

  let query = {};
 
  if ((selectedLocations.length > 0 && selectedLocations[0] !== undefined) 
        && (selectedEvents.length > 0 && selectedEvents[0] !== undefined)) { 
    // 둘 다 입력 시 -> length는 0 이상인데, 첫번째 인자가 undefined가 아니여야 데이터가 있는 것 !
    if (selectedLocations.length > 0) {
      query.location = { $in: selectedLocations };
    }
    if (selectedEvents.length > 0) {
      query.type = { $in: selectedEvents };
    }

  } else { 
      // 유형 선택, 위치 미선택(undefined)
      if (selectedEvents.length > 0 & (selectedLocations.length === 1 && selectedLocations[0] === undefined)) {
        query.type = { $in: selectedEvents };
      }
      // 위치 선택, 유형 미선택(undefined)
      if (selectedLocations.length > 0 & (selectedEvents.length === 1 && selectedEvents[0] === undefined)) {
        query.location = { $in: selectedLocations };
      }
  }

    let result = await db.collection('program').find(query).toArray();

    if (Array.isArray(result) && result.length === 0) {
      console.log('일치하는 항목이 없습니다.');
      res.redirect('/search')
    } else {
      console.log('일치하는 항목이 존재합니다.');
      res.render('../views/search.ejs', { 리스트: result });
    }

    
});

router.get('/keyword', async(req, res) => {
  let val = req.query.val
  console.log(val)
  let result = await db.collection('program').find({title : val}).toArray()
  //res.render('../views/search.ejs', {리스트 :result});
  res.redirect('/search?keyword='+val)
});

// 리뷰보기로 이동
router.get('/reviews', async(req, res) => {
  let title = req.query.title;
  console.log('/reviews' + title)

  res.sendFile(path.join(__dirname, '../public', 'detail.html'));
})

router.get('/api/getReviewData', async(req, res) => {
  
  const title = req.query.title
  console.log(title)

  let reviewData = await db.collection('reviews').find({title : title}).toArray()
  res.json(reviewData)


});



// // 공공데이터 프로그램 정보 openAPI로 변경해야 함.
// router.get('/api/getProgramData', (req, res) => {
  
//   //아래는 임시 데이터
//   const programData = [
//       {
//           title: '부천전시',
//           type: '전시',
//           INST: '경기문화재단',
//           link: 'https://ggc.ggcf.kr/cultureEvents/view/5faa30cd22471c662d8bdaa6',
//           time: '10:00 - 18:00',
//           price: '무료',
//           start: '2020-11-10',
//           end: '2020-12-06',
//           location: '부천'
//       }
//   ];

//   res.json(programData);
// });



module.exports = router



