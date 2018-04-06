const sqlite3 =require("sqlite3");//导入库
const path = require("path");
const db = new sqlite3.Database(path.resolve("./.sqlite3.db"));//解析成绝对路径
//serialize函数让所有查询顺序执行，同一时间只执行一个查询
db.serialize(function(){
	//db.run执行 UPTATE、CREATE、DELETE操作
	db.run("INSERT INTO temperature VALUES(datetime('now','localtime'),18.8)");
	//"all"方法返回查询的所有结果，保存在回调函数的"results"参数中
	db.all("SELECT * FROM temperature",(err,results)=>{
		if(err)
		{
			console.error(err);
		}
	    console.log(results);
	});
});
db.close();