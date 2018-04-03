const get_sensor_readings=require("./get-readings");
const cached_readings={temperature:null,humidity:null};
//dht11数字温湿度传感器的采样周期要大于等于2秒
setInterval(()=>{
	get_sensor_readings((err,temperature,huimidity)=>{
		if(err)
		{
			return console.error(err);
		}
		else//没有错误便将温湿度保存在缓存对象cached_readings中
		{
			cached_readings.temperature=temperature;
			cached_readings.humidity=huimidity;
		}
	});
},2000);

//将温湿度导出
module.exports.get_temperature=()=>{
	cached_readings.temperature;
};
module.exports.get_humidity=()=>{
	cached_readings.humidity;
};
