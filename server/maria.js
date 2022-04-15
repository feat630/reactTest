const maria = require('mysql');

const conn = maria.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'root1234',
	database:'react'
});
 
module.exports = conn;