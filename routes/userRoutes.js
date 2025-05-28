const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

/**
 * express.Router() fonksyionu yeni bir instance yaratır.
 * Bu router, belirli bir router ('/api/v1/tours') içim HTPP isteklerini
 * yönetmek için kullanılacak. Bu fonksiyon genelde middleware tanımlamak için
 * kullanılır.
 */
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// All routes after this line will require authentication
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router
  .route('/:id/reviews')
  .post(authController.restrictTo('user'), reviewController.createReview);

// All routes after this line will require admin privileges
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
