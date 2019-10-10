require('dotenv').config();
var moment = require('moment');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
const axios = require('axios');

var searchPackage = process.argv[2];


switch (searchPackage) {
  case 'spotify-this-song':
    //loop to handle the song name 
    var song= "";
    for(var i=3; i < process.argv.length; i++){
      song +=  process.argv[i] + " ";
    }

    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });
    spotify
      .search({ type: 'track', query: song ,limit:'1' })
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
    break;
      case 'movie-this':
          var key = keys.omdb.key;
          var title = "";

          for(var i=3; i < process.argv.length; i++){
            // if(process.argv[process.argv.length - 1]=== process.argv[i]){
            //   title +=  process.argv[i]
            // }else{
            title +=  process.argv[i] + "+";
            // }
          }
          var url = `http://www.omdbapi.com/?t=${title}&apikey=${key}`

          axios.get(url)
          .then(function (response) {
            // handle success
            console.log(title);
            
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });


      break;


  default:
    break;
}


