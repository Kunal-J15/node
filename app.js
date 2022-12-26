const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const db = require('./util/database.js');
// console.log(db);
// db.execute('SELECT * from products').then((data)=>{console.log(data);})


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use("*",errorController.get404);

app.listen(3000);
