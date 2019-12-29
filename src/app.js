const express = require('express')
const bodyParser  = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({
            status: false,
            msg: "Poxa que pena, não foi possível encontra uma Playlist :'(",
            recomendations: []
        });
    }
});

const { routeVersion, routeRecomendationMusic } = require("./route")

app.get('/v1', routeVersion);
app.get('/v1/recommendations/music/city', routeRecomendationMusic);

module.exports = app