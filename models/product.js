const rootDir = require("../utils/path");
const path =require("path");
const fs = require("fs");

const p = path.join(rootDir,"Data","products.json");

const fetchData = function(cb){ 
    fs.readFile(p,(err,data)=>{
    if(err) cb([]);
    data = JSON.parse(data);
    cb(data);
})
}

module.exports = class Product{
    constructor(t){
        this.title =t;
    }

    save(){
        fetchData((data)=>{
            data.push(this);
            return fs.writeFile(p,JSON.stringify(data),(err,data)=>{
                if(err) console.log(err);
                if(data) return data;
            })
        })
    }
    static fetchAll(cb){
       fetchData(cb);
}
}