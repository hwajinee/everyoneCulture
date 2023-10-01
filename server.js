const express = require('express');
const path = require('path');

const app = express();
const PORT = 8800;

// 정적 파일 서비스를 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// 각 HTML 파일에 대한 라우팅
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

// API 엔드포인트: 간단한 메시지 반환
app.get('/api/message', (req, res) => {
  const message = 'This is a sample message from the API.';
  res.json({ message });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
