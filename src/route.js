
const { normalizeString } = require("./utils/NormalizeString")
const PlayList = require("./controller/PlayListController")

module.exports.routeVersion = (req, res) => {
    res.status(200).send({
        application: process.env.APP_NAME,
        version: process.env.APP_VERSION
    });
}

module.exports.routeRecomendationMusic = (req, res) => {
    const cityName = normalizeString(req.query.name) || ""

    if(cityName == ""){
        res.status(200).json({
            status: false,
            msg: "Informe o nome de uma cidade"
        });
    }

    PlayList.getPlayList(req, res, cityName)
}