const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

/**
 * express.Router() fonksyionu yeni bir instance yaratır.
 * Bu router, belirli bir router ('/api/v1/tours') içim HTPP isteklerini
 * yönetmek için kullanılacak. Bu fonksiyon genelde middleware tanımlamak için
 * kullanılır.
 */
const router = express.Router();

// Tüm review işlemlerini reviewRouter'a yönlendirdik.
router.use('/:tourId/reviews', reviewRouter);

/**
 * Alias
 * /top-5-cheap adresini aliasTopTours middleware'ine yönlendirdik.
 * Gelen request'i orada manipule ederek getAllTours'a yolladık.
 */
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
