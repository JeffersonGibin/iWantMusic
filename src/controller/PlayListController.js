const { getPlayListByGenre } = require("../model/SpotifyModel")
const WeatherMapModel = require("../model/WeatherMapModel")
const { recomendationGenreMusic } = require("../service/PlayListService")
const { MSG_PLAYLIST_NOT_FOUND, MSG_PLAYLIST_SUCCESS } = require("../constants/MessageConstant")

const getPlayList = async (req, res, cityName) => {
    try {
        
        const { temp } = await WeatherMapModel.getTemperatureByCityName(cityName)
        
        if(!temp) {
            throw Error()
        }
        
        const genre = recomendationGenreMusic(temp)
        const playList = await getPlayListByGenre(genre)
        
        res.status(200).json({
            status: true,
            temp: temp,
            msg: MSG_PLAYLIST_SUCCESS,
            recomendations: playList
        })
            
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: MSG_PLAYLIST_NOT_FOUND,
            recomendations: []
        })
    }
}

module.exports = {
    getPlayList
}