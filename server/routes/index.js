const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const apartmentRouter = require('./apartmentRouter');
const newsRouter = require('./newsRouter');
const cityRouter = require('./cityRouter');
const fileRouter = require('./fileRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');

router.use('/user', userRouter);
router.use('/city', cityRouter);
router.use('/apartment', apartmentRouter);
router.use('/news', newsRouter);
router.use('/files', fileRouter);
router.use('/chat-article', articleRouter);
router.use('/comment', commentRouter);

module.exports = router;
