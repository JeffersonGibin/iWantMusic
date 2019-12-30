const WeatherMapRepository = require("../repository/WeatherMapRepository")
const SpotifyRepository = require("../repository/SpotifyRepository")
const MessageConstant = require("../constants/MessageConstant")
const PlayListService = require("../service/PlayListService")
const playlistCache = require("../cache/cache.json")

const getPlayList = async (req, res, cityName) => {
    try {
        const { temp } = await WeatherMapRepository.getTemperatureByCityName(cityName)
        const genre = PlayListService.recomendationGenreMusic(temp)
        const playList = await SpotifyRepository.getPlayListByGenre(genre)

        if (!playList) {
            throw Error()
        }

        res.status(200).json({
            temp: temp,
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