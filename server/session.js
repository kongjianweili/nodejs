var config = {
	user : 'sa',
	password : 'upmg38149404',
	server:'localhost',
	database : 'javis'
}
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var options = {
    table : 'Sessions'
};
global.app.use(session({
    store : new MSSQLStore(config,options),
    secret : '012345678QWER'
}));
