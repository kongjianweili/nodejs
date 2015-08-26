
var sql = require('mssql');
var config = {
	user : 'sa',
	password : 'upmg38149404',
	server:'localhost',
	database : 'javis',
	pool : {
		max : 100,
		min : 0,
		idleTimeoutMillis : 30000
	}
}
sql.Connection.prototype.prepare = function (procedure){
    this.procedureName = procedure;
    this.request = new sql.Request(this);
    return this;
}
sql.Connection.prototype.transaction = function (fn){
    this.begin(function (err){
        if(err){
            console.log('begin transaction failed - ');
            console.log(err);
            console.log('---------------------------');
        }
        else {
            try {
                fn();
                this.commit(function (err){
                    if(err){
                        console.log('commit failed ----------');
                        console.log(err);
                        console.log('------------------------');
                    }
                });
            }
            catch(ex){
                console.log('transaction auto rollback : ' + ex);
                this.rollback(function (err){
                    if(err){
                        console.log('rollback failed ---------');
                        console.log(err);
                        console.log('-------------------------');
                    }
                });
            }
        }
    });
}
sql.Connection.prototype.in = function (obj,val){

    switch(typeof obj){
        case 'object':
            for(var idx in obj){
                this.in(obj[idx]);
            }
            break;
        case 'array':
            for(var i=0;i<obj.length;i++){
                this.in(obj[i]);
            }
            break;
        case 'string':
            if(val){
                this.request.input(obj,val);
            }
            else {

            }
            break;
        default:
            throw "wrong input key : " + obj;
            break;
    }
    return this;
}
sql.Connection.prototype.out = function(obj){
    this.request.output(obj);
    return this;
}
sql.Connection.prototype.exec = function (fn,erfn) {
    if(!this.request || !this.procedureName){
        throw " prepare을 하지 않았습니다";
    }
    this.request.execute(this.procedureName,function (err,records,returnValue){
        if(!err){
            fn(returnValue,records,this.request);
        }
        else {
            console.log(err);
            erfn(err);
        }
    });
    return this;
}


module.exports = function (fn){
    var conn = new sql.Connection(config,function (err){
        console.log(err);
        if(!err){
            fn(conn);
        }
    });
};
