const router = require('express').Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


let connectDB = require('../db.js')

let db
connectDB.then((client)=>{
  db = client.db('everyoneCulture');
}).catch((err)=>{
  console.log(err)
})

