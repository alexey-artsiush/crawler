const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')

router.get('/download', fileController.downloadFile)

module.exports = router
