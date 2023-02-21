// const Cart = require('../models/cart');
const Order = require('../models/orders');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find().then((products,meta) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
    }).catch(e=>console.log(e));
};

exports.getProduct = (req, res, next) => {
  const {id} = req.params
  return Product.findById(id)
    .then((p)=>res.render('shop/product-detail',{product:p,pageTitle:"Product Details",path:"/products"}))
    .catch(e=>console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>console.log(e));
};

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId').then(user=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:user.cart.items
      }); 
    })
};

exports.addToCart = (req, res, next) => {
    const id= req.body.id;
    req.user.addToCart(id)
    .then(temp=>{
      res.redirect("/cart");
    }).catch(e=>console.log(e));
  };

  exports.removeFromCart = (req, res, next) => {
    req.user.removeFromCart(req.body.id)
                .then(res.redirect("/cart"))
                .catch(e=>console.log(e));
  };

exports.getOrders = (req, res, next) => {
  Order.find({userId:req.user._id}).populate("products.productId").then(orders=>{
    console.log(orders[0].products);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    });
  });
  
};
exports.createOrder = (req, res, next) => {
  console.log(req.user.cart.items);
 const order = new Order({products:req.user.cart.items,userId:req.user})

  order.save().then(()=>{
    req.user.cart.items = [];
   return req.user.save();
  }).then(()=>{
    res.redirect('/orders')
  })
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

