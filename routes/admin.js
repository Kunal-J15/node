const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router({mergeParams:true});

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.route('/edit-product/:id').get(adminController.getEditProduct)
      .post(adminController.editProduct)
router.delete('/delete-product',adminController.deleteProduct)

module.exports = router;
