const router = require('express').Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


let connectDB = require('../db.js')

let db
connectDB.then((client)=>{
  // console.log('search.js => DB연결성공')
  db = client.db('everyoneCulture');
}).catch((err)=>{
  console.log(err)
})

// router.get('/result', async(req,resp)=> {

//   console.log('선택한 도시' + req.query.val)
//   let result = await db.collection('program').find({location : req.query.val}).toArray()
//   console.log(result)
//   if(Array.isArray(result) && result.length == 0){
//     res.sendFile(path.join(__dirname, '../public', 'search.html'));

//   } else {
//     console.log('일치하는 항목이 존재합니다.')
//     resp.render('searchList.ejs', {검색결과 : result});
//   }
// })

router.post('/result', async(req, res) => {
  const selectedLocation = req.body.gyeonggi;
  
  if (selectedLocation) {
    let result = await db.collection('program').find({ location: selectedLocation }).toArray()
    console.log(result)
    if(Array.isArray(result) && result.length == 0){
      console.log('일치하는 항목이 없습니다.')
    } else {
      console.log('일치하는 항목이 존재합니다.')
      res.render('searchList.ejs', {검색결과 : result});
    }
  } else { // 선택한게 없으면, 모두 띄우기
    let result = await db.collection('program').find({}).toArray();

    res.render('searchList.ejs', {검색결과 : result});
  }
});

router.get('/detail', (req, resp) => {
  const filePath = path.join(__dirname, '../public/searchList.html');
    res.sendFile(filePath);
})


module.exports = router