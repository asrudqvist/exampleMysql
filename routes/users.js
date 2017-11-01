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
		console.log("Result: " + JSON.stringify(result));
		res.json(result);
	}
  });
		
});

// Add user
router.post('/adduser', function(req,res){
	var db = req.db.db;
	var sql = 'insert into people (age,email,fullname,gender,location,username) values (?,?,?,?,?,?)';
	console.log('Req body = ['+JSON.stringify(req.body)+']');
	var user = req.body;
	console.log('add user ' + JSON.stringify(user));
	
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
	var db = req.db.db;
	var userToDelete = req.params.id;
	console.log('deleting user :' + userToDelete);
	var sql = 'delete from people where id=?';
	
	db.query(
		sql,
		[userToDelete],
	    function(err,result){
			var resp_msg = (err === null) ?  {msg: ''} : {msg: err};
			res.send(resp_msg);
	});
});

// Update User
router.put('/putuser/:id', function(req,res){
	var db = req.db.db;
	var userToUpdate = req.params.id;
	console.log('updating user :' + userToUpdate);
	var user = req.body;
	var sql = "update people set age=?,email=?,fullname=?,gender=?,location=?,username=? where id=?";
	
	db.query(
		sql,
		[user.age,user.email,user.fullname,user.gender,user.location,user.username,userToUpdate],
		function (err, result) {
			var resp_msg = (err === null) ?  {msg: ''} : {msg: err};
			res.send(resp_msg);
		});
});

module.exports = router;
