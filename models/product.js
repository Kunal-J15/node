
const {ObjectId} = require("mongodb");
const getDb =  require("../util/database").getDb;
// const db = require('../util/database');

class Product {
  constructor(title,price,imageUrl,description){
    this.title=title;
    this.price=price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save(){
    const db = getDb();
    return db.collection('products').insertOne(this).then(result=>{console.log(result)}).catch(e=>{
      console.log(e)
      throw e;
    });
  }
  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray();
  }
  static findById(id){
    const db = getDb();
    return db.collection('products').find({_id: new ObjectId(id)}).next().then(product=>{
    // console.log(product);
      return  product
    }).catch(e=>console.log(e));
  }
  static deleteById(id){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(id)}).then(product=>{
    // console.log(product);
      return  product
    }).catch(e=>console.log(e));
  }
  static findByIdAndUpdate(id,data){
    const db = getDb();
  }
}

// const Product = sequelize.define('product',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   title: {
//     type:Sequelize.STRING,
//     allowNull:false,
//   },
//   price:{
//     type:Sequelize.DOUBLE,
//     allowNull:false,
//   },
//   imageUrl:{
//     type:Sequelize.STRING,
//     allowNull:false
//   },
//   description : Sequelize.TEXT
// });
module.exports = Product;
// module.exports = class Product {
//   constructor(title, imageUrl, description, price,id=null) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.id = id;
//   }

//   save() {
//     if(this.id){
//       return db.execute('update products set title = ?,price = ?, imageUrl = ?, description = ? where id=?',[this.title,this.price,this.imageUrl,this.description,this.id]);
//     }else{
//       return db.execute('INSERT INTO products (title,price, imageUrl, description) values (?, ?, ?, ?)',[this.title,this.price,this.imageUrl,this.description]);
//   }
// }
//   static  getProduct(id) {
//     return db.execute('select * from products where id=?',[id]);
//   }

//   static deleteById(id) {
//   return db.execute('delete from products where id=?',[id]);
//   }

//   static fetchAll() {
//     return db.execute('select * from products');
//   }
// };
