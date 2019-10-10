var dotenv =  require('dotenv').config();
var moment = require('moment');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var searchPackage = process.argv[2];



var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

spotify
  .search({ type: 'track', query: 'happy',limit:'1' })
  .then(function(response) {
   
    //songs name
    console.log(response.tracks.items[0].name);
    //artist, maybe run a loop through artist for the names if more than one 
    console.log(response.tracks.items[0].artists[0].name);
    //album name
    console.log(response.tracks.items[0].album.name);  
    //preview of track
    console.log(response.tracks.items[0].external_urls.spotify);
    
  })
  .catch(function(err) {
    console.log(err);
  });