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
  req.user.createProduct({ title,price,imageUrl,description }).then(d=>res.redirect('/')).catch(e=>console.log(e));
  // Product.create({
  //   title,price,imageUrl,description,userId:req.user.id
  // }).then(d=>res.redirect('/')).catch(e=>console.log(e));
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(e=>console.log("getProducts",e));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  return Product.findByPk(id)
    .then((product)=>{
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
  Product.findByPk(id).then(p=>{
    p.title =title;
    p.price = price;
    p.imageUrl = imageUrl;
    p.description = description;
    p.save();
  }).then(()=>res.redirect("/admin/products"))
  .catch(e=>console.log(e));
};

exports.deleteProduct = (req,res,next)=>{
  const {id} = req.body;
  Product.findByPk(id)
    .then(p=>p.destroy())
    .then(()=>{
    res.redirect("/admin/products");
  }).catch(e=>console.log(e));
}