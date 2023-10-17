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


router.get('/',async(req, resp) => {
  if(req.query.title){
    let searchTitle = req.query.title
    let result = await db.collection('program').find({title : searchTitle}).toArray() 
    resp.render('../views/search.ejs', { 리스트 : result })
  }else {
    let result = await db.collection('program').find().toArray() 
    resp.render('../views/search.ejs', { 리스트 : result })
  }
});

// router.get('/title',async(req, resp) => {
//   let searchTitle = req.query.title
//   let result = await db.collection('program').find({title : searchTitle}).toArray() 
//   resp.render('../views/search.ejs', { 리스트 : result })
// });

router.post('/', async(req, res) => {
  let selectedLocation = req.body.gyeonggi;
  //let selectedEvent = req.body.event;
  
  if (selectedLocation ) { // 둘 다 선택 시,
      let result = await db.collection('program').find({ location: selectedLocation }).toArray()
    if(Array.isArray(result) && result.length == 0){
      console.log('일치하는 항목이 없습니다.')
    } else {
      console.log('일치하는 항목이 존재합니다.')
      res.render('../views/search.ejs', {리스트 :result})
    }
  }
});

router.get('/keyword', async(req, res) => {
  let val = req.query.val
  console.log(val)
  let result = await db.collection('program').find({title : val}).toArray()
  //res.render('../views/search.ejs', {리스트 :result});
  res.redirect('/search?title='+val)
});



router.get('/detail', (req, res) => {
  res.render('../views/detail.ejs')
})


module.exports = router