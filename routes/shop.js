const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProduct);

router.route('/cart')
                .get(shopController.getCart)
                .post(shopController.addToCart)
                .delete(shopController.removeFromCart);

router.get('/orders', shopController.getOrders);
router.post("/create-order",shopController.createOrder);
router.get('/checkout', shopController.getCheckout);



module.exports = router;
