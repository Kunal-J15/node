const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const {id} = req.params
  return Product.getProduct(id,(p)=>res.render('shop/product-detail',{product:p,pageTitle:"Product Details",path:"/products"}));
  
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
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

