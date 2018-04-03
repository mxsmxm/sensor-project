const express = require("express");
const get_cached_readings = require("./get_cached_readings");
const light_control=require("./light-control");
const app = express();
app.get("/temperature", function(req, res){
	let my_temperature = get_cached_readings.get_temperature();
	console.log(my_temperature);
	res.send(`${my_temperature}°C`);
});
app.get("/humidity", function(req, res){
	let my_humidity = get_cached_readings.get_humidity();
	console.log(my_humidity);
	res.send(`${my_humidity}%`);
});
app.get("/on", function(req, res){
	light_control.on();
	console.log("light on");
});
app.get("/off", function(req, res){
	light_control.off();
	console.log("light off");
});
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});