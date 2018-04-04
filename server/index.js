const express = require("express");
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
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});