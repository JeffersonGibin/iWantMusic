const { recomendationGenreMusic } = require("../service/PlayListService")
const MessageConstant = require("../constants/MessageConstant")
const { getPlayListByGenre } = require("../model/SpotifyModel")
const WeatherMapModel = require("../model/WeatherMapModel")
const playlistCache = require("../cache/cache.json")

const getPlayList = async (req, res, cityName) => {
    try {
        const { temp } = await WeatherMapModel.getTemperatureByCityName(cityName)
        const genre = recomendationGenreMusic(temp)
        const playList = await getPlayListByGenre(genre)
        
        if(!playList) {
            throw Error()
        }
        
        res.status(200).json({
            temp: temp,
            msg: MessageConstant.MSG_PLAYLIST_SUCCESS,
            recomendations: playList
        })
            
    } catch (error) {
        console.log("[** LOG ** ] ", MessageConstant.MSG_ERROR)
        res.status(200).json({
            msg: MessageConstant.MSG_PLAYLIST_RECOMENDATIONS,
            recomendations: playlistCache
        })
    }
}

module.exports = {
    getPlayList
}