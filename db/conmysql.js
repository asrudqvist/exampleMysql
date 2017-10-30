var mysql = require('mysql')

module.exports = function () 
{
	this.db;
	var connobj;
	//Database=localdb;Data Source=127.0.0.1:54989;User Id=azure;Password=6#vWHD_$
	var conInfo = process.env.MYSQLCONNSTR_localdb;
	
	function getConnObj (str)
	{
		var ds = /Data Source=([^;]+)/.exec(s)[1]
		return  {
		  host     : ds[0],
		  port	   : ds[1],
		  user     : /User Id==([^;]+)/.exec(s)[1],
		  password : /Password=([^;]+)/.exec(s)[1],
		  database : /Database=([^;]+)/.exec(s)[1]
		}
	}
    
	this.connect = function(){
		var obj = this.getConnObj(this.conInfo)
		this.db = mysql.createConnection(obj);

		db.connect(function(err) {
		  if (err){
			  //throw err;
			  console.log("Error conecting to db\n" + err);
			  console.log("-------------------------------");
			  console.log(JSON.stringify(obj));
			  console.log("-------------------------------");
			  console.error(err.stack);
		  } else {
			console.log('You are now connected to mysql...');
		  }
		});		
	}
	
}
