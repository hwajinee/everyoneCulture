const express = require('express');
const path = require('path');
const { performSearch } = require('./search'); // 검색 로직 가져오기

const app = express();
const PORT = 8800;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// 검색을 위한 API 엔드포인트
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const results = performSearch(query); // 검색 함수 호출
  res.json({ results });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
