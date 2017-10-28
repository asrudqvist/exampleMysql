var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get user list
router.get('/userlist',function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	var collection  = db.get('userlist');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
	
});

// Add user
router.post('/adduser', function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	console.log('add user ' + req.body.toString());
	
	collection.insert(req.body,function(err,result){
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