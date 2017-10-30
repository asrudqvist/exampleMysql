var mysql = require('mysql')

module.exports = function () 
{
	this.db;
	var connobj;
	//Database=localdb;Data Source=127.0.0.1:54989;User Id=azure;Password=6#vWHD_$
	var conInfo = process.env.MYSQLCONNSTR_localdb;
	
	function getConnObj (s)
	{
		console.log("s = [" + s +"]");
		var ds = /Data Source=([^;]+)/.exec(s);
		console.log(ds);
		var dds = ds[1].split(":");
		
		return  {
		  host     : dds[0],
		  port	   : dds[1],
		  user     : /User Id=([^;]+)/.exec(s)[1],
		  password : /Password=([^;]+)/.exec(s)[1],
		  database : /Database=([^;]+)/.exec(s)[1]
		};
	}
    
	this.connect = function(){
		var obj = getConnObj(this.conInfo)
		this.db = mysql.createConnection(obj);

		this.db.connect(function(err) {
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
