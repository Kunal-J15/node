const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products,meta) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
    }).catch(e=>console.log(e));
};

exports.getProduct = (req, res, next) => {
  const {id} = req.params
  return Product.findByPk(id)
    .then((p)=>res.render('shop/product-detail',{product:p,pageTitle:"Product Details",path:"/products"}))
    .catch(e=>console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>console.log(e));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(c=>{
    c.getProducts().then(products=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    })
    
  })
};

exports.addToCart = (req, res, next) => {
    const id= req.body.id;
    let qty=1;
    let krt;
    req.user.getCart()
    .then(cart=>{
      krt=cart;
      return cart.getProducts({where:{ id:id}})
    }).then(products=>{
      let product;
      if(products.length>0) product = products[0];
      if(product){
       qty = product.cartItem.quantity+1;
      }
      return Product.findByPk(id); 
    }).then(product=>{
      return krt.addProduct(product, { through: { quantity : qty } })
    }).then(temp=>{
      res.redirect("/cart");
    }).catch(e=>console.log(e));
  };

  exports.removeFromCart = (req, res, next) => {
    req.user.getCart()
                .then(c=>c.getProducts({where:{id:req.body.id}}))
                .then(p=>p[0].destroy())
                .then(res.redirect("/cart"))
                .catch(e=>console.log(e));
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

