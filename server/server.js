var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var express = require('express');
var app = express();
var debug = true;
var caches = {};
var db = require('./db.js');
global.app = app;
global.db = db;
require('./ext.js');
require('./session.js');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var loadApi = (function (dir){
    fs.readdir(dir,function (err,results){
        if(err) {
            console.log(err);
            return;
        }
        for(var i in results){
            var scan = function (ts){
                fs.stat(ts,function (err,res){
                    if(!err){
                        if(res.isDirectory()){
                            loadApi(ts);
                        }
                        else if(path.extname(ts).toLowerCase() == '.js'){
                            require(ts);
                        }
                    }
                });
            }
            scan(dir + '/'+results[i]);
        }
    });
});
loadApi('./api');


app.use(express.static('../public'));

app.listen(5000);
