const Router = require('express')
const router = new Router()
const parseController = require('../controllers/parseController')

router.post('/', parseController.parseBlog)
router.get('/', parseController.getHistoryBlog)
module.exports = router
