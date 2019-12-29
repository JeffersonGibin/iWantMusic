
const { normalizeString } = require("./utils/NormalizeString")
const PlayList = require("./controller/PlayListController")
const { MSG_INPUT_REQUIRED } = require("./constants/MessageConstant")

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
            msg: MSG_INPUT_REQUIRED
        });
    }

    PlayList.getPlayList(req, res, cityName)
}