const express = require('express');
const userController = require('./../controllers/userController');

/**
 * express.Router() fonksyionu yeni bir instance yaratır.
 * Bu router, belirli bir router ('/api/v1/tours') içim HTPP isteklerini
 * yönetmek için kullanılacak. Bu fonksiyon genelde middleware tanımlamak için
 * kullanılır.
 */
const router = express.Router();

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
