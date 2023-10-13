const router = require('express').Router()

router.get('/filter', (req,resp) => {
    resp.send("검색필터 페이지입니다.")
})

module.exports = router;