const axios = require("axios")
const {
    WEATHER_MAP_API_URL
} = require("../constants/WeatherMapConstant")
const Notify = require('../Notify')

const handleParamTemperature = (city_name, coordinates) => {
    if(city_name) {
        return  `q=${city_name}`
    }else{
        return `lat=${coordinates.lat}&lon=${coordinates.lon}`
    }  
}

const getTemperature = async (city_name, coordinates) => {
    const param = handleParamTemperature(city_name, coordinates)
    const token = process.env.WEATHER_APP_ID
    
    if (!token) throw Error()

    return await axios.get(`${WEATHER_MAP_API_URL}weather?${param}&units=metric&appid=${token}`)
        .then(response => (
            {
                success: true,
                temp: response.data.main.temp,
                city: response.data.name
            }
        ))
}

const getTemperatureByCoordinates = async (coordinates) => {
    try {
       return await getTemperature(null, coordinates)
    } catch (error) {
        Notify.emit("onIntegrationError", "[Integration Open Weather Error ] " + error);
    }
}

const getTemperatureByCityName = async (city_name) => {
    try {
       return await getTemperature(city_name)
    } catch (error) {
        Notify.emit("onIntegrationError", "[Integration Open Weather Error ] " + error);
    }
}

module.exports = {
    getTemperatureByCityName,
    getTemperatureByCoordinates
}