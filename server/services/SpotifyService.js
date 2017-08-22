'use strict'

//Load credentials from file
require('dotenv').config()

const credentials = {
  client: {
    id: process.env.client_id,
    secret: process.env.client_secret
  }
};

const oauth2 = require('simple-oauth2').create(credentials);
const request = require('request-promise-native');
const Song = require('Song.js');

let accessToken = null;

/**
 * Retrieve all of a song's metadata from Spotify API with the given songId and return a Song object with
 * containing relevant fields.
 */
exports.getSong = function(songId) {
    ensureAccessToken();
    return request({
        uri : "https://api.spotify.com/v1/tracks/${songId}",
        headers: {
            'Authorization' : accessToken.token()
        }
    }).then((songData) => {
        return new Song(songData);
    }).catch(error => {
        console.log("Spotify get track error", error.message());
        throw error;
    });
}

/**
 * Ensure that SpotifyService has a valid access token. If token doesn't exist or is expired,
 * fetch a new one. If a valid token already exists, do nothing.
 * This method should be called before making any API requests.
 */
function ensureAccessToken() {
    const tokenConfig = {};
    //Fetch new token if one doesn't exist or it has expired. Spotify doesn't provide a refresh token.
    if (!accessToken || accessToken.expired()) {
        oauth2.clientCredentials.getToken(tokenConfig).then((result) => {
            accessToken = oauth2.accessToken.create(result);
        }).catch((error) => {
            console.log("Access token error", error.message);
        });
    }
}
 
