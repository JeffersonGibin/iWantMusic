const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser  = require('body-parser')

const MessageConstant = require("./constants/MessageConstant")
const playlistCache = require("./cache/cache.json")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: false }))
app.dotEnv = dotenv.config({ path: __dirname + '/../env/.env' })

if(!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_SECRET_ID || !process.env.WEATHER_APP_ID){
    console.log("[ ** ERROR CREDENTIALS NOT FOUND ** ] Add your credentials in /env/.env ")
    process.exit()
}

app.use((err, req, res, next) => {
    if (err) {
        console.log("[** LOG ** ] ", MessageConstant.MSG_ERROR)
        res.status(200).json({
            msg: MessageConstant.MSG_PLAYLIST_RECOMENDATIONS,
            recomendations: playlistCache
        })
    }
})

const { routeVersion, routeRecomendationMusic } = require("./route")

app.get('/v1', routeVersion)
app.get('/v1/recommendations/music/city', routeRecomendationMusic)

module.exports = app