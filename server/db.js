const sqlite3 =require("sqlite3");//导入库
const path = require("path");
const db = new sqlite3.Database(path.resolve("./.sqlite3.db"));//解析成绝对路径
/*定义一些数据库操作相关函数*/
//添加值到数据库中
const insertsensor_reading=(type,value)=>{
	db.run("INSERT INTO ${type} VALUES(datetime('now','localtime'),${value})");
};
//获取数据库中最新的n个数据
const getLatestSensor_readings=(type,num,callback)=>{
	//以数据获取时间进行降序排序，异步操作需要一个callback作为参数
	db.all("SELECT * FROM ${type} ORDER BY created_time DESC LIMIT ${num}",callback);
};
//获取一段时间内的数据
const getSersorReadings_betweenTime=(type,start,end,callback)=>{
	//start,end 作为查询参数提供，为了防止SQL注入，增加安全性
	db.all("SELECT * FROM ${type} WHERE created_time>? AND created_time<?",[start,end],callback);
}
//获取一段时间内数据的平均值
const getAvg_sensorReading_betweenTime=(type,start,end,callback)=>{
	//get方法返回一个值
	db.get("SELECT avg(value) FROM ${type} WHERE created_time>? AND created_time<?",[start,end],callback);	
}
//关闭数据库
const close_db=()=>{
	db.close();
}
//将函数导出
module.exports={
	insertsensor_reading,
	getLatestSensor_readings,
	getSersorReadings_betweenTime,
	getAvg_sensorReading_betweenTime,
	close_db	
}
