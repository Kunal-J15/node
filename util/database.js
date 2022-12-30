const Sequelize = require("sequelize");
const sequelize = new Sequelize('node','root','K1unal123@',{
    dialect:"mysql",
    host:'localhost'
});
module.exports = sequelize;

// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node',
//     password:'K1unal123@'
// });

// module.exports = pool.promise();