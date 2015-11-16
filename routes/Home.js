
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	  res.render('signin', {result:'', title: 'CALCULATOR' });
	});

/*router.post('/add', function(req,res){
	a=parseFloat(req.param("number1"));
	b=parseFloat(req.param("number2"));	
	if (isNaN(a) || isNaN(b))
		res.render('calculator', {result: "Input is not valid.",title:"CALCULATOR"});
	else
		res.render('calculator', {result: "The Result:"+a+"+"+b+"="+ (a+b),title:"CALCULATOR"});
})*/


	
	module.exports = router;
