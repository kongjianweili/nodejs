var app = global.app;
var db = global.db;
var querystring = global.querystring;
app.post('/api/account/join',function (req,res){
    var xml = '';
    xml += '<ROOT><ACCOUNT>';
    xml += '<id>' + req.body.id.cdata() + '</id>';
    xml += '<name>' + req.body.name.cdata() + '</name>';
    xml += '<pw>' + req.body.pw.cdata() + '</pw>';
    xml += '<salt>'+ String(Math.random()).substring(0,16) + '</salt>';
    xml += '</ACCOUNT></ROOT>';
    db(function ($conn){
         $conn
         .prepare('pcAccountUpdate')
         .in('MODE','I')
         .in('DATA',xml)
         .exec(function (ret,records){
              res.json({success:ret});
         },function (err){
            res.json({success:0});
         });
    });
});
app.post('/api/account/login',function (req,res){
     db(function ($conn){
        $conn
        .prepare('pcAccountSelect')
        .in('Account',req.body.id)
        .in('PSWD',req.body.pw)
        .exec(function (req,records){
            res.json(records);
        },function (err){
            res.json({success:0});
        });
     });
});
app.post('/api/test',function (req,res){

    console.log(req.body);
    res.json({a:3});
});
