const express = require("express");
const sensor =require("node-dht-sensor");
const app = express();
app.get("/temperature", (req, res) => {
	sensor.read(11,17,function(err,temperature,humidity){
		if(!err)
		{
			let dht_temperature=temperature.toFixed(1);
			res.send("${dht_temperature}°C");
			}
	res.send("24°C");
});
app.get("/humidity", (req, res) => {
	sensor.read(11,17,function(err,temperature,humidity){
		if(!err)
		{
			let dht_humidity=temperature.toFixed(1);
			res.send("${dht_humidity}%");
			}
	res.send("24°C");
});
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});