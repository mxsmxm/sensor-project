const express = require("express");
db_operations=require("./db");
const get_cached_readings = require("./get_cached_readings");
const light_control=require("./light-control");
const path=require("path");
const app = express();
app.use("/public",express.static(path.join(__dirname,"public")));
app.get("/temperature", function(req, res){
	let my_temperature = get_cached_readings.get_temperature();
	console.log(my_temperature);
	res.json({val:my_temperature});
});
app.get("/humidity", function(req, res){
	let my_humidity = get_cached_readings.get_humidity();
	console.log(my_humidity);
	res.json({val:my_humidity});
});
app.get("/on", function(req, res){
	light_control.on();
	res.send("light is on")
	console.log("light is on");
});
app.get("/off", function(req, res){
	light_control.off();
	res.send("light is off");
	console.log("light is off");
});
//数据库相关
app.get("/temperature/history",(req,res)=>{
	db_operations.getLatestSensor_readings("temperature",10,(err,results)=>{
		if(err)
		{
			console.error(err);
		}
		res.json(results.reverse());
		
	});
});
app.get("/humidity/history",(req,res)=>{
	db_operations.getLatestSensor_readings("humidity",10,(err,results)=>{
		if(err)
		{
			console.error(err);
		}
		res.json(results.reverse());
		
	});
});
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});