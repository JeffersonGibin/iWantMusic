const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

const MessageConstant = require("./constants/MessageConstant")
const playlistCache = require("./cache/cache.json")
const Notify = require('./Notify')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: false }))
app.dotEnv = dotenv.config({ path: __dirname + '/../env/.env' })

app.error((err, req, res, next) => {
    if (err instanceof NotFound) {
        res.render("<p>Page not found!</p>");
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    if (err) {
        Notify.emit("onAPIError", {
            msg: MessageConstant.MSG_ERROR,
            err: err
        })

        res.status(200).json({
            msg: MessageConstant.MSG_PLAYLIST_RECOMENDATIONS,
            recomendations: playlistCache
        })
    }
})

Notify.emit("onCredentials", {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID: process.env.SPOTIFY_SECRET_ID,
    WEATHER_APP_ID: process.env.WEATHER_APP_ID,
})

const { welcome, routeVersion, routeRecomendationMusic } = require("./route")

app.get('/', welcome)
app.get('/v1', routeVersion)
app.get('/v1/recommendations/music/city', routeRecomendationMusic)

module.exports = app