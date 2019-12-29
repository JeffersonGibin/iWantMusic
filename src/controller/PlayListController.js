const { getPlayListByGenre } = require("../model/SpotifyModel")
const WeatherMapModel = require("../model/WeatherMapModel")
const { recomendationGenreMusic } = require("../service/PlayListService")

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
            msg: "Preparamos essa playlist aposto que vai adorar :)",
            recomendations: playList
        });
            
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Poxa que pena, não foi possível encontra uma Playlist :'(",
            recomendations: []
        });
    }
}

module.exports = {
    getPlayList
}