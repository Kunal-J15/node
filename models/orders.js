const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products:[{
        productId:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'Product'
        },
        quantity:{
            type:Number
        }
}],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model("Order",orderSchema);