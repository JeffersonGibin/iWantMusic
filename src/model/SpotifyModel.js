const axios = require("axios")
const {
	SPOTIFY_API_URL
} = require("../constants/SpotifyConstant")

const getToken = async () => {
	const mixinClientSecretID = process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET_ID
	const basicAuthToken = new Buffer.from(mixinClientSecretID).toString('base64')

	return await axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + basicAuthToken,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: {
			grant_type: 'client_credentials'
		},
		json: true,
	})
	.then(body => body.data.access_token || false)
	.catch(e => e.response.data)
}

const getPlayListByGenre = async (genre_speed) => {
	const token = await getToken() 
	
	if(!token || !genre_speed) return false

	
	const REQUEST_URL = [
		SPOTIFY_API_URL,
		"/recommendations?",
		"market=US&",
		"seed_genres=",
		genre_speed,
		"&min_energy=0.9",
		"&min_popularity=50"
	].join("")
	
	const playlist = await axios.get(REQUEST_URL, {
		headers: {
			'Authorization': "Bearer " + token
        }
    })
	.then(response => response.data)
	.catch(e => ({
        status: false
    }))

	return playlist.tracks.map((item) => ({
		music: item.name,
		artists: item.artists.map((artist) => artist.name),
		album: item.album.name
	})) || []
}

module.exports = {
	getPlayListByGenre
}