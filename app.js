const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const sequelize = require('./util/database.js');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

Product.belongsTo(User,{constrains:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart,{through:CartItem});


sequelize.sync(/*{force:true}*/).then(()=>{
   return User.findByPk(1);
}).then((u)=>{
    if(!u){
        return User.create({name:"max",email:'test@test.com'})
    }
    return u;
}).then(u=>{
    return u.createCart();
}).then(u=>{
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})
// console.log(db);
// db.execute('SELECT * from products').then((data)=>{console.log(data);})




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findByPk(1).then((u)=>{
        req.user = u;
        next();
    }); 
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use("*",errorController.get404);
