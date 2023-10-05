
const performSearch = (searchQuery) => {
    //지금은 더미 데이터로 하드코딩 해놓음
    const results = ['온누리 약국', '건대 약국', '건대 병원','일산 성모 병원'];
    return results.filter(result => result.includes(searchQuery));
  };
  
  module.exports = {
    performSearch,
  };
  