const app = require("./src/app")
const port = process.env.APP_PORT || 4000;

if (app.dotEnv.error) {
	console.log("[ ERROR dotEnv] ", app.dotEnv.error.message)
	process.exit()
}

app.listen(port, () => {
	console.log(`Server is ready!`)
})