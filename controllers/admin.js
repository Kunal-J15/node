const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  Product.getProduct(id,(product)=>{
     res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing:editMode,
    product:product
  });
  
  });
};
exports.editProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body;
  const id = req.params.id;
  console.log(id);
  const product = new Product(title, imageUrl, description, price,id);
  product.save();
  res.redirect("/admin/products");
};

exports.deleteProduct = (req,res,next)=>{
  const {id} = req.body;
  console.log(Product.deleteById)
  Product.deleteById(id,()=>{
    res.redirect("/admin/products");
  })
}