const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser  = require('body-parser')

const { MSG_PLAYLIST_NOT_FOUND } = require("./constants/MessageConstant")

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
        res.status(err.status || 500).json({
            status: false,
            msg: MSG_PLAYLIST_NOT_FOUND,
            recomendations: []
        })
    }
})

const { routeVersion, routeRecomendationMusic } = require("./route")

app.get('/v1', routeVersion)
app.get('/v1/recommendations/music/city', routeRecomendationMusic)

module.exports = app