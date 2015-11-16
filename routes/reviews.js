
/*
 * GET home page.
 */

exports.reviews = function(req, res){
	ejs.renderFile('./views/createcategories.ejs',function(err, result) {
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
};