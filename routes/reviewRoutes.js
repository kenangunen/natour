const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// Merge params allows us to access the tourId from the parent route
const router = express.Router({ mergeParams: true });

router.use(authController.protect); // Protect all routes after this line

router.route('/').get(reviewController.getAllReviews).post(
  authController.restrictTo('user'),
  reviewController.setTourUserIds, // if the tourId is not provided in the body, it will be set from the params
  reviewController.createReview
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
