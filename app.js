const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require("mongoose");
const errorController = require('./controllers/error');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'views');

// const mongoConnect = require('./util/database.js').mongoConnect;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');

// Product.belongsTo(User,{constrains:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart,{through:CartItem});


mongoose.connect("mongodb+srv://Kunal:ZZedpfLBme2GFNBq@ecom.qeu0ozi.mongodb.net/test?retryWrites=true&w=majority").then(u=>{
    app.listen(3000);
});
// console.log(db);
// db.execute('SELECT * from products').then((data)=>{console.log(data);})




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req,res,next)=>{
//     User.findById("63f2519a831d003527cdbc2c").then((u)=>{
//         req.user = new User(u.name,u.email,u.cart,u._id);
//         next();
//     }); 
// })
app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use("*",errorController.get404);
