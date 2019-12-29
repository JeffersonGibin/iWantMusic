
/**
 * URL API
*/
const SPOTIFY_API_VERSION = "v1"
const SPOTIFY_API_URL = "https://api.spotify.com/" + SPOTIFY_API_VERSION
const SPOTIFY_ACCOUNT_API_URL = "https://accounts.spotify.com"

/**
 * Seed Genres Music
*/
const SPOTIFY_GENRES_MIXIN = "classical, rock-n-roll, party, pop"
const SPOTIFY_GENRE_SEED_CLASSIC_MUSIC = "classical"
const SPOTIFY_GENRE_SEED_ROCK = "rock-n-roll"
const SPOTIFY_GENRE_SEED_PARTY = "party"
const SPOTIFY_GENRE_SEED_POP = "pop"

module.exports = {
    SPOTIFY_GENRE_SEED_CLASSIC_MUSIC,
    SPOTIFY_GENRE_SEED_PARTY,
    SPOTIFY_GENRE_SEED_ROCK,
    SPOTIFY_ACCOUNT_API_URL,
    SPOTIFY_GENRE_SEED_POP,
    SPOTIFY_GENRES_MIXIN,
    SPOTIFY_API_URL
}