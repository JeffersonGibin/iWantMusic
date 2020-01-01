const WeatherMapRepository = require("../repository/WeatherMapRepository")
const SpotifyRepository = require("../repository/SpotifyRepository")
const MessageConstant = require("../constants/MessageConstant")
const PlayListService = require("../service/PlayListService")
const playlistCache = require("../cache/cache.json")

const getPlayList = async (req, res, params) => {
    
    try {
        let apiResult = {}
        if(params.cityName){
            apiResult = await WeatherMapRepository
                .getTemperatureByCityName(params.cityName)
        } else if(params.coordinates){
            apiResult = await WeatherMapRepository
                .getTemperatureByCoordinates(params.coordinates)
        }else {
            throw Error()
        }


        console.log(apiResult)
        
        const genre = PlayListService.recomendationGenreMusic(apiResult.temp)
        const playList = await SpotifyRepository.getPlayListByGenre(genre)
        
        if (!playList) {
            throw Error()
        }

        res.status(200).json({
            temp: apiResult.temp,
            city: params.cityName || apiResult.city || "",
            msg: MessageConstant.MSG_PLAYLIST_SUCCESS,
            recomendations: playList
        })

    } catch (error) {
        res.status(200).json({
            msg: MessageConstant.MSG_PLAYLIST_RECOMENDATIONS,
            recomendations: playlistCache
        })
    }
}

module.exports = {
    getPlayList
}