const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const announcementsRouter = require('./routes/announcements');
const boardRouter = require('./board');
const Announcement = require('./models/Announcement');

const app = express();
const PORT = 8800;

const mongoURI = 'mongodb://localhost:27017/notice_culture';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

require('./models/Announcement');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', announcementsRouter);
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

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const results = performSearch(query);
  res.json({ results });
});

app.get('/api/message', (req, res) => {
  const message = 'This is a sample message from the API.';
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
