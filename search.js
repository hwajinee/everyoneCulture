const performSearch = (searchQuery) => {
  // 실제로는 서버로부터 데이터를 받아오는 API 호출이 되어야 함
  // 여기서는 더미 데이터로 하드코딩하여 결과를 반환함
  const results = [
      { name: 'Park Hyo Shine Concert', address: '부천시 종합운동장' },
      { name: '우아한 테크코스 설명회', address: '고양시 일산구' },
      { name: '사진전', address: '평택시 홍길동' },
      { name: '사진전2', address: '평택시 홍길동' },
      { name: '사진전3', address: '평택시 홍길동' },
      { name: '사진전4', address: '평택시 홍길동' },
      { name: '일산전', address: '고양시 일산구' }
  ];

  
  // 검색어와 일치하는 결과 필터링
  return results.filter(result => result.name.includes(searchQuery));
};

module.exports = {
  performSearch,
};
