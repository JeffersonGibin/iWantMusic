
const { MSG_INPUT_REQUIRED } = require("./constants/MessageConstant")
const { normalizeString } = require("./utils/NormalizeString")
const PlayList = require("./controller/PlayListController")

module.exports.routeVersion = (req, res) => {
    res.status(200).json({
        application: "iWantMusic",
        version: "1.0.0"
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