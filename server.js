const app = require("./src/app")
const Notify = require('./src/Notify')
const port = process.env.APP_PORT || 4000;

app.listen(port, () => {
	Notify.emit("onServer", "Server is Ready [ Port " + port + " ] :) ");
})