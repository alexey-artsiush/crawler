const Router = require('express');
const router = new Router();
const apartmentController = require('../controllers/apartmentController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkActive = require('../middleware/checkActivationUser');

router.post('/', apartmentController.create);
router.put(
  '/change-premium',
  checkRole('ADMIN'),
  apartmentController.changePremiumStatus
);
router.put('/update-apartment', apartmentController.updateApartment);
router.get('/', apartmentController.getAll);
router.get('/users-apartment', apartmentController.getByUserId);
router.get('/:id', apartmentController.getOne);
router.delete('/', apartmentController.delete);

module.exports = router;
