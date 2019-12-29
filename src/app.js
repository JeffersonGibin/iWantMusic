const { MSG_PLAYLIST_NOT_FOUND } = require("./constants/MessageConstant")

const express = require('express')
const bodyParser  = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

const app = express()
const dotEnv = dotenv.config({ path: __dirname + '/../env/.env' })
 
if (dotEnv.error) {
  console.log("[ ERROR dotEnv] ", dotEnv.error.message)
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.disable('x-powered-by')

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