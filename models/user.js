// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const {getDb} = require('../util/database');
// const {ObjectId} = require("mongodb");


// const Product = require('./product');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:[{
           productId: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
            },
            quantity:{
                type:Number,
                required:true
            }
    }]
    }
})
module.exports = mongoose.model("User",userSchema);
class User{
    constructor(name,email,cart,id){
        this.name = name;
        this.email = email;
        this.cart = cart?cart:{items:[]};
        this._id = id && new ObjectId(id);
    }
    save(){
        const db = getDb();
        return db.collection("users").insertOne(this).then(user=>user).catch(e=>console.log(e));
    }
    addToCart(productId){
        const db = getDb();
        const prodIdx = this.cart.items.findIndex(e=>e.productId.toString()===productId.toString());
        const updatedCartItems = [...this.cart.items];
        if(prodIdx!=-1){
            updatedCartItems[prodIdx].quantity += 1;
            
        }else{
            updatedCartItems.push({productId:new ObjectId(productId),quantity:1});
        }
        return db.collection("users").updateOne({_id:this._id},{$set:{cart:{items:updatedCartItems}}}).then(result=>result).catch(e=>console.log(e));
    }
    getCart(){
        const db = getDb();
        const productsId = this.cart.items.map(p=>p.productId) ;
        return db.collection("products").find({_id:{$in:productsId}}).toArray().then(products=>{
            return products.map(product=>{
                return {...product,quantity: this.cart.items.find(i=>i.productId.toString() ===product._id.toString()).quantity}
            })
        })
    }
    async createOrder(){
        const db = getDb();
        this.getCart().then(products=>{
            const order = {products:products,userId:this._id};
            return db.collection("orders").insertOne(order).then(order=>{
                return order;
            })
        }).then(()=>{
            return db.collection("users").updateOne({_id:this._id},{$set:{cart:{items:[]}}}).catch(e=>console.log(e));
        })
    }
    getOrders(){
        const db = getDb();
        return db.collection("orders").find({userId:this._id}).toArray().then(o=>o).catch(e=>console.log(e));
        
    }
    removeFromCart(productId){
        const db = getDb();
        const items = this.cart.items.filter(e=>e.productId.toString()!== productId.toString());
        return db.collection("users").updateOne({_id:this._id},{$set:{cart:{items}}})
    }
    static findById(id){
        const db = getDb();
        return db.collection("users").find({_id:new ObjectId(id)}).next().then(user=>user).catch(e=>console.log(e));
    }
}

// module.exports = User;