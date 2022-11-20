const Router = require('express');
const router = new Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.create);
router.get('/', articleController.getAll);

module.exports = router;
