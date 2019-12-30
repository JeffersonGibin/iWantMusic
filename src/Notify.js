const EventEmitter = require('events')
const event = new EventEmitter()

event.on('onServer', console.log)
event.on("onIntegrationError", (err) => console.log)

event.on("onAPIError", (arg) => {
    console.log(`[** API Error ** ] ${arg.msg}`)
})

event.on('onDotEnv', (dotEnv) => {
    if (dotEnv.error) {
        console.log(dotEnv.error.message);
        process.exit()
    }
});

event.on('onCredentials', (credentials) => {
    if (!credentials.SPOTIFY_CLIENT_ID || !credentials.SPOTIFY_SECRET_ID || !credentials.WEATHER_APP_ID) {
        console.log("[ ** ERROR CREDENTIALS NOT FOUND ** ] Add your credentials in /env/.env ")
        process.exit()
    }
})

module.exports = event