const fs = require('fs');
const path = require('path');
const db = require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price,id=null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    if(this.id){
      return db.execute('update products set title = ?,price = ?, imageUrl = ?, description = ? where id=?',[this.title,this.price,this.imageUrl,this.description,this.id]);
    }else{
      return db.execute('INSERT INTO products (title,price, imageUrl, description) values (?, ?, ?, ?)',[this.title,this.price,this.imageUrl,this.description]);
  }
}
  static  getProduct(id) {
    return db.execute('select * from products where id=?',[id]);
  }

  static deleteById(id) {
  return db.execute('delete from products where id=?',[id]);
  }

  static fetchAll() {
    return db.execute('select * from products');
  }
};
