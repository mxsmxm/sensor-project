const get_sensor_readings=require("./get-reading");
const db_operations=require("./db");
/*
    insertsensor_reading(type,value),
	getLatestSensor_readings(type,num,callback),
	getSersorReadings_betweenTime(type,start,end,callback),
	getAvg_sensorReading_betweenTime(type,start,end,callback),
	close_db	
  */
const cached_readings={temperature:0,humidity:0};
//dht11数字温湿度传感器的采样周期要大于等于2秒
setInterval(()=>{
	get_sensor_readings((err,temperature,humidity)=>{
		if(err)
		{
			return console.error(err);
		}
		 //没有错误便将温湿度保存在缓存对象cached_readings中	
		 else
		 {
		 	//除了保存在cached_readings这个变量里面，还需要保存在数据库中
			cached_readings.temperature=temperature.toFixed(1);
			cached_readings.humidity=humidity.toFixed(1);
			//保存在数据库中
			db_operations.insertsensor_reading("temperature",temperature.toFixed(1));
			db_operations.insertsensor_reading("humidity",humidity.toFixed(1));
			db_operations.close_db();
			}
	});
},2000);

//将温湿度导出
module.exports.get_temperature=()=>cached_readings.temperature;
module.exports.get_humidity=()=>cached_readings.humidity;
