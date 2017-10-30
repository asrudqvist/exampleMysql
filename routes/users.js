var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get user list
router.get('/userlist',function(req,res){
	var db = req.db.db;
	var sql = 'select * from people';
	
	db.query(sql, function (err, result) {
    if (err){ 
		console.log(err);
		console.log(err.stack);
		throw err;
	} else {
		console.log("Result: " + result);
		res.json(result);
	}
  });
		
});

// Add user
router.post('/adduser', function(req,res){
	var db = req.db.db;
	var sql = 'insert into people (age,email,fullname,gender,location,username) values (?,?,?,?,?,?)';
	var user = req.body;
	console.log('add user ' + user.toString());
	
	db.query(
		sql,
		[user.age,user.email,user.fullname,user.gender,user.location,user.username],
		function (err, result) {
			var resp_msg = (err === null) ? {msg: ''} : {msg: err};
			res.send(resp_msg);
	});
});

// Delete user
router.delete('/deleteuser/:id', function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	var userToDelete = req.params.id;
	console.log('deleting user :' + userToDelete);
	
	collection.remove({'_id': userToDelete}, function(err){
		var resp_msg = (err === null) ?  {msg: ''} : {msg: err};
		res.send(resp_msg);
	});
});

// Update User
router.put('/putuser/:id', function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	var userToUpdate = req.params.id;
	console.log('deleting user :' + userToUpdate);
	
	collection.update(
		{'_id': userToUpdate},
		{$set: req.body},
		function(err){
			var resp_msg = (err === null) ?  {msg: ''} : {msg: err};
			res.send(resp_msg);
		});
});

module.exports = router;
