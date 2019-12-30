const axios = require("axios")
const {
    WEATHER_MAP_API_URL
} = require("../constants/WeatherMapConstant")
const Notify = require('../Notify')

const getTemperatureByCityName = async (city_name) => {
    try {
        const token = process.env.WEATHER_APP_ID

        if (!token || !city_name) throw Error()

        const REQUEST_URL = [
            WEATHER_MAP_API_URL,
            "weather?q=",
            city_name,
            "&units=metric",
            "&appid=",
            token
        ].join("")

        return await axios.get(REQUEST_URL)
            .then(response => (
                {
                    success: true,
                    temp: response.data.main.temp,
                    min: response.data.main.temp_min,
                    max: response.data.main.temp_max
                }
            ))
    } catch (error) {
        Notify.emit("onIntegrationError", "[Integration Open Weather Error ] " + error);
    }
}

module.exports = {
    getTemperatureByCityName
}