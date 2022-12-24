const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price,id=null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    console.log(this.id);
    if(this.id){
      getProductsFromFile((products)=>{
        const idX = products.findIndex(e=>e.id==this.id);
        console.log(idX);
        const updated = [...products];
        updated[idX] = this;
        fs.writeFile(p, JSON.stringify(updated), err => {
          if(err)console.log(err);
        });
      })
    }else{
      this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        if(err) console.log(err);
      });
    });
    }
  }
  static  getProduct(id,cb) {
    getProductsFromFile((data)=>{
      const product = data.find(e=>e.id==id);
      cb(product);
    })
  }

  static deleteById(id,cb) {
    getProductsFromFile((data)=>{
      const products = data.filter(e=>e.id!=id);
      fs.writeFile(p, JSON.stringify(products), err => {
        if(err) console.log(err);
      });
      cb();
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
