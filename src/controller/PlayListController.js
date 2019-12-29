const { getPlayListByGenre } = require("../model/SpotifyModel")
const WeatherMapModel = require("../model/WeatherMapModel")
const { recomendationGenreMusic } = require("../service/PlayListRecomendationService")

const getPlayList = async (req, res, cityName) => {
    const { temp } = await WeatherMapModel.getTemperatureByCityName(cityName)
    .catch((e) => {
        res.status(200).json({
            status: false,
            msg: "Poxa que pena, não foi possível encontra uma Playlist :'(",
            recomendations: []
        });
    })

    if(!temp) {
        res.status(200).json({
            status: false,
            msg: "Poxa que pena, não foi possível encontra uma Playlist :'(",
            recomendations: []
        });
    }

    const genre = recomendationGenreMusic(temp)
    const playList = await getPlayListByGenre(genre)
    .catch((e) => {
        res.status(200).json({
            status: false,
            msg: "Poxa que pena, não foi possível encontra uma Playlist :'(",
            recomendations: []
        });
    })

    res.status(200).json({
        status: true,
        temp: temp,
        msg: "Preparamos essa playlist aposto que vai adorar :)",
        recomendations: playList
    });
}

module.exports = {
    getPlayList
}