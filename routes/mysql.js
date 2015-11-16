var ejs= require('ejs');
var mysql = require('mysql');
var dataPool=require('../routes/ConnectionPooling');

function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function insertData(callback,sqlQuery,post){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery, post ,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	
function updateData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}
function deleteData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}




exports.deleteData=deleteData;
exports.fetchData=fetchData;
exports.insertData=insertData;
exports.updateData=updateData;
