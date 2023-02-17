const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback=>{
  MongoClient.connect("mongodb+srv://Kunal:ZZedpfLBme2GFNBq@ecom.qeu0ozi.mongodb.net/test?retryWrites=true&w=majority")
  .then(r=>{console.log("client connected");
     _db = r.db();
     callback();
  })
  .catch(err=>{
    console.log(err);
  })
}

function getDb() {
    if(_db) return _db;
    throw "Db not exist"
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;