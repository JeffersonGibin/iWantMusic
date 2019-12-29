const { getPlayListByGenre } = require("../model/SpotifyModel")
const WeatherMapModel = require("../model/WeatherMapModel")
const { recomendationGenreMusic } = require("../service/PlayListService")
const { MSG_PLAYLIST_NOT_FOUND } = require("../constants/MessageConstant")

const getPlayList = async (req, res, cityName) => {
    try {
        const { temp } = await WeatherMapModel.getTemperatureByCityName(cityName)
        const genre = recomendationGenreMusic(temp)
        const playList = await getPlayListByGenre(genre)
    
        if(!temp || !playList) {
            throw Error()
        }
        
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