const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/reviewsdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', function() {
    console.log('MongoDB 연결 성공');
});

// 리뷰 모델 정의
const Review = mongoose.model('Review', {
    reviewText: String,
    password: String,
});

// 정적 파일 제공 (index.html)
app.use(express.static('public'));

// JSON 파싱 미들웨어 설정
app.use(bodyParser.json());

// 후기 저장 API
app.post('/api/reviews', (req, res) => {
    const { reviewText, password } = req.body;

    const review = new Review({ reviewText, password });
    review.save()
        .then(() => {
            res.json({ message: '후기 저장 완료' });
        })
        .catch(err => {
            res.status(500).json({ message: '오류: ' + err.message });
        });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
