const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'carts.json'
);

module.exports = class Cart{
   static addProduct(id,productPrice){
    fs.readFile(p,(err,data)=>{
        let cart= {products:[],total:0};
        if(!err){
            cart = JSON.parse(data);
        }
        const exProductIdx = cart.products.findIndex((e)=>e.id==id)
        const exProduct = cart.products[exProductIdx];
        let updated;
        if(exProduct){
            updated = {...exProduct};
            updated.qty = updated.qty+1;
            cart.products = [...cart.products];
            cart.products[exProductIdx] =updated;
        }else{
            updated = {id:id,qty:1};
            cart.products.push(updated);
        }
        cart.total = cart.total+ productPrice;
        fs.writeFile(p,JSON.stringify(cart),(err)=>{
           if(err) console.log("error",err);
        })
    })
   }
}
