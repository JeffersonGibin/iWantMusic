
const { MSG_INPUT_REQUIRED } = require("./constants/MessageConstant")
const { normalizeString } = require("./utils/NormalizeString")
const { formatNumber } = require("./utils/Number")
const PlayList = require("./controller/PlayListController")

module.exports.welcome = (req, res) => {
    res.status(200).json({
        application: "Welcome :)",
        now: new Date()
    });
}

module.exports.routeVersion = (req, res) => {
    res.status(200).json({
        application: "iWantMusic",
        version: "1.0.0"
    });
}

module.exports.routeRecomendationMusic = (req, res) => {
    const cityName = normalizeString(req.query.city) || false
    const coordinates = req.query.lat && req.query.lon && {
        lat: formatNumber(req.query.lat),
        lon: formatNumber(req.query.lon)
    } || false

    if (!cityName && !coordinates) {
        res.status(200).json({
            status: false,
            msg: MSG_INPUT_REQUIRED
        });
    }

    PlayList.getPlayList(req, res, {
        cityName: cityName,
        coordinates: coordinates 
    })
}