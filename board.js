const express = require('express');
const router = express.Router();
const Announcement = require('./models/Announcement'); 

const announcements = [
  { id: 1, title: '우아한 태크코스 설명회', content: '경기도 안양시에서 개최하는 행사입니다.' },
  { id: 2, title: '10센치미터 콘서트', content: '키 차이가 10센티미터인데 혼자오실거같습니다.' },
  { id: 3, title: '기리보이 콘서트', content: '기리보이 파이팅' },
  { id: 4, title: '장삐주 사진전', content: '나는 알락꼬리 꼬마도요가 아니라.' },
  { id: 5, title: '신세계2 시사회', content: '재밌겠다' },
  { id: 6, title: '모터쇼', content: '모터 자랑의 날' },
  { id: 7, title: '호러쇼', content: '무서운거 자랑하기' },
  { id: 8, title: '중간고사', content: '경기도 학생드로 시험 파이팅' },
  { id: 9, title: '종강 행사', content: '종강하자' },
  { id: 10, title: '경기도 컴공의날', content: '컴공만 쉬는 날이라 개최한 세미나' }
];

router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json({ announcements });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
