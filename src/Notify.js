const EventEmitter = require('events')
const event = new EventEmitter()

event.on('onServer', console.log)
event.on("onIntegrationError", (err) => console.log)

event.on("onAPIError", (arg) => {
    console.log(`[** API Error ** ] ${arg.msg}`)
})

event.on('onCredentials', (credentials) => {
    if (!credentials.SPOTIFY_CLIENT_ID || !credentials.SPOTIFY_SECRET_ID || !credentials.WEATHER_APP_ID) {
        console.log("[ ** ERROR CREDENTIALS NOT FOUND ** ] Set your credentials.")
        process.exit()
    }
})

module.exports = event
