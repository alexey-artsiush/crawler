const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login) 
router.post('/logout', userController.logout) 
router.get('/activate/:link', userController.activate) 
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.put('/update', userController.update)

module.exports = router 