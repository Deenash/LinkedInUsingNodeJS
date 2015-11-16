var express = require('express');
var router = express.Router();
var moment = require('moment');
var mysql=require("./mysql");
var ejs=require("ejs");
var waterfall = require('async-waterfall');


router.get('/', function(req, res) {
	res.render('signin', {result:'', title: 'CALCULATOR' });
});


router.post('/register', function(req,res)
		{

	req.session.emailid=req.param("loginid");
	var firstname=req.param("firstname");
	var lastname=req.param("lastname");
	var password=req.param("password");
	var university=req.param("university");
	var location=req.param("location");
	var mobileno=req.param("mobileno");
	console.log("Hello Deenash"+mobileno);

	var now =moment(new Date());
	var logintime=now.format("HH:mm DD MMM YYYY");
	var post1 = {
			FirstName : firstname,
			LastName: lastname,
			EmailId : emailid,
			Password:password,
			University:university,
			Location:location,
			MobileNumber:mobileno,
			logintime:logintime
	};


	//var getUser="select * from userdetails where firstname='"+req.param("loginid")+"'";
	var insertData1='INSERT INTO userdetails SET ?';
	//console.log("Query is:"+firstname+lastname+emailid+password);


	mysql.insertData(function(err,results){


		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				console.log(results);
				console.log("valid Login");
				//var logintime=JSON.stringify(results[2]);
				//var one=results[0].logintime;

				ejs.renderFile('./views/profile.ejs',{result1:logintime},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    
				console.log("Invalid Login");
				res.render('./views/index',{result1:"logintime"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},insertData1,post1);

		});

router.post('/signIn', function(req,res)
		{


	req.session.emailid=req.param("loginid");


	var getUser="select * from userdetails where emailid='"+req.session.emailid+"'"+"and password="+"'"+req.param("inputpassword")+"'";
	console.log("Query is:"+getUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){


				var time1=results[0].logintime;
				var name=results[0].FirstName;
				var sum=results[0].Summary;
				var proj=results[0].Projects;
				var exp=results[0].WorkExperience;
				var edu=results[0].EducationDetails;

				console.log("valid Login");
				ejs.renderFile('./views/profile.ejs',{data:time1,fname:name,summary:sum,project:proj,experience:exp,education:edu},function(err, result) {
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    

				console.log("Invalid Login user");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getUser);

	var now =moment(new Date());
	var logintime2=now.format("HH:mm DD MMM YYYY");

	req.session.emailid=req.param("loginid");
	var insertData1="update userdetails set logintime='"+logintime2+"'"+"where emailid="+"'"+req.session.emailid+"'";
	
mysql.updateData(function(err,results){
		
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
			
				console.log("time added");
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},insertData1);
	}	);


router.post('/connections', function(req,res)
		{
	//req.session.emailid=req.param("loginid");


	var getUser="select * from userdetails JOIN connections on connections.connectionId = userdetails.EmailId And connections.EmailId='"+req.session.emailid+"'";
	console.log("Query is:"+getUser);
	//req.session.emailid=req.param("loginid");

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

				var name=[];
				var email=[];
				console.log(results.length);
				for(var i=0;i<results.length;i++)
					{
						 name[i]=results[i].FirstName;
						 email[i]=results[i].EmailId;
						 
						
						
					}
				//console.log(one);
				console.log("valid Login");
				ejs.renderFile('./views/connection.ejs',{data1:name,data2:email},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    

				console.log("Invalid Login user");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getUser);

/*	var now =moment(new Date());
	var logintime=now.format("HH:mm DD MMM YYYY");

	req.session.emailid=req.param("loginid");
	var insertData1="update userdetails set logintime='"+logintime+"'"+"where emailid="+"'"+emailid+"'";*/
		});



router.post('/displayEdit', function(req,res)
		{
	


	var getUser="select * from userdetails where emailid='"+req.session.emailid+"'";
	console.log("Query is:"+getUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){


				
				
				var sum=results[0].Summary;
				var proj=results[0].Projects;
				var exp=results[0].Experience;
				var edu=results[0].EducationDetails;

				console.log("valid Login");
				ejs.renderFile('./views/displayConnection.ejs',{summary:sum,project:proj,experience:exp,education:edu},function(err, result) {
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    

				console.log("Invalid Login user");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getUser);
	
	});





router.post('/editProfile', function(req,res)
		{
	
	
	var Summary=req.param("summ1");
	var WorkExperience=req.param("exp1");
	var Education=req.param("education1");
	var Projects=req.param("projects1");
	
	console.log("hi Deenash");
	                                                                // Experience
	var insertData1="update userdetails set Summary='"+Summary+"'"+",WorkExperience= '"+WorkExperience+"'"+",EducationDetails='"+Education+"'"+",Projects='"+Projects+"'"+"where EmailId="+"'"+req.session.emailid+"'";
	console.log("Query is:"+insertData1);
	mysql.updateData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows  > 0){
				console.log("valid Login");
				var succ="Updated category ";
				ejs.renderFile('./views/displayConnectionSuccessPage.ejs',{successmsg:succ},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},insertData1);

});

router.post('/signOut', function(req,res)
		{
	req.session.destroy();
	var succ="Log out Success";
	ejs.renderFile('./views/signinSuccess.ejs',{successmsg:succ},function(err, result) {
		   // render on success
		   if (!err) {
			   //console.log(conect.cookieParser);
		            res.end(result);
		           
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });
	
	

	});


router.post('/delete', function(req,res)
		{
	

	var insertData1="Delete from userdetails where EmailId='"+req.session.emailid+"'";
	mysql.updateData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows  > 0){
				console.log("valid Login");
				var succ="Deleted Your Account successfully ";
				ejs.renderFile('./views/signinSuccess.ejs',{successmsg:succ},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},insertData1);
	
	
	
	

		});





module.exports = router;

