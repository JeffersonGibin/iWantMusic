const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('../swagger/swagger.json')
const helmet = require("helmet")

const MessageConstant = require("./constants/MessageConstant")
const playlistCache = require("./cache/cache.json")
const Notify = require('./Notify')

/**
 * Starting express
 */
const app = express()

/**
 * Initialing settings 
 */
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

/**
 * Notify credentials of project
 */
Notify.emit("onCredentials", {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID: process.env.SPOTIFY_SECRET_ID,
    WEATHER_APP_ID: process.env.WEATHER_APP_ID,
})


/**
 * Import routes system
 */
const { welcome, routeVersion, routeRecomendationMusic } = require("./Route")

/**
 * Route welcome
 */
app.get('/', welcome)

/**
 * Route version API
*/
app.get('/v1', routeVersion)

/**
 * Route for recomendation of music
*/
app.get('/v1/recommendations/music/localization', routeRecomendationMusic)

/**
 * Route for access documentation API
*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app