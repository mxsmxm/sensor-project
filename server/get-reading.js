const sensor =require("node-dht-sensor");
sensor.read(11,17,function(err,temperature,humidity){
		if(!err)
		{
		console.log("temperature:"+temperature.toFixed(1)+"C"+"humidity:"+humidity.toFixed(1)+"%");
			}

});
