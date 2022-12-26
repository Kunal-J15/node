const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products,meta]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
    }).catch(e=>console.log(e));
};

exports.getProduct = (req, res, next) => {
  const {id} = req.params
  return Product.getProduct(id)
    .then(([p])=>res.render('shop/product-detail',{product:p[0],pageTitle:"Product Details",path:"/products"}))
    .catch(e=>console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([products,meta]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>console.log(e));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
//   res.redirect("/cart")
};

exports.addToCart = (req, res, next) => {
    const id= req.body.id;
    Product.getProduct(id,(p)=>{
        Cart.addProduct(id,+p.price);
    })
    res.redirect("/cart");
  };

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

