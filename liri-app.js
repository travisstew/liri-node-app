require('dotenv').config();
var moment = require('moment');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
const axios = require('axios');
var fs  = require('fs');

var searchPackage = process.argv[2];
switch (searchPackage) {
  case 'spotify-this-song':
       liriSpotify('The Sign by Ace of Base');
      break;
      case 'movie-this':
        liriMovie("Mr. Nobody");            
      break;
        case 'concert-this': 
        liriConcert();
      break;
      case 'do-what-it-says':
          liriDoWhat()
      break;
  default:
    break;
}

//FUNCTIONS FOR SWITCH STATMENTS

function liriSpotify(track){
 
  var song= "";
    //loop to handle the song name
    for(var i=3; i < process.argv.length; i++){
      song +=  process.argv[i] + " ";
    }
    //if statment for handling the song track parameter
    if(process.argv.length === 3){
      song = track;
    }
    
    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });
    spotify
      .search({ type: 'track', query: song ,limit:'1' })
      .then(function(response) {
      var item = response.tracks.items[0];
      var array = [item.name, ]
      //songs name
      console.log(item.name,item.artists[0].name,item.album.name);
      //artist, maybe run a loop through artist for the names if more than one 
      console.log(item.artists[0].name);
      //album name
      console.log(item.album.name);  
      //preview of track
      console.log(item.external_urls.spotify);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//MOVIE THIS
function liriMovie(movie) {  
    var key = keys.omdb.key;
    var title = "";

    for(var i=3; i < process.argv.length; i++){
      if(process.argv[process.argv.length - 1]=== process.argv[i]){
        title +=  process.argv[i]
      }else{
      title +=  process.argv[i] + "+";
      }
    }
    //if statment to handle the movie title
    if(process.argv.length === 3){
      title = movie;
    }
    var url = `http://www.omdbapi.com/?t=${title}&apikey=${key}&upcoming`

    axios.get(url)
    .then(function (response) {        
    var res = response.data;    
    //
    var data = [res.Title, res.Released,res.imdbRating, res.Country, res.Language, res.Plot,res.Actors];
    var dataTitle = ['Title: ', 'Release Date: ', 'IMDB Rating: ', 'Country: ','Language: ', 'Plot: ', 'Actors: ' ];

    for(var i =0; i < data.length; i++){
          console.log(dataTitle[i] +data[i] );     
      }
    if(res.Ratings.length > 0){
      console.log('Ratings: ' + res.Ratings[0].Value);
    }
    })
    .catch(function (error) {
      // handle error
      console.log(error);  
      })
    .finally(function () {
      // always executed
      });
}

//CONCERT
function liriConcert(){
    var key = keys.bands.key;         
    var artist = apiParameter("%20")

    var url = `http://rest.bandsintown.com/artists/${artist}/events?app_id=${key}&date=upcoming`

    axios.get(url)
    .then(function (response) {          
      var res = response.data;
    
    if(res.length === 0){
      console.log('this artist has no upcoming shows');
    }else{
      //venue
      console.log(res[0].venue.name);
      //location 
      console.log(res[0].venue.city +',' + res[0].venue.region);
      //date
      console.log(moment(res[0].datetime,'hh:mm').format('MM DD YYYY') );  
    }
    })
    .catch(function (error) {
      // handle error 
      console.log('error');
    })
    .finally(function () {
      // always executed
    }); 
}

function liriDoWhat(){
    fs.readFile('random.txt', 'utf8',(err, data)=>{
        if(err){
          return console.log(err);
        }
        var newData = data.split(',');
          if(newData[0] === 'spotify-this-song'){
              liriSpotify(newData[1]);
          }
      });
  }

function apiParameter(symbol){
    var artist = "";
    for(var i=3; i < process.argv.length; i++){
      if(process.argv[process.argv.length - 1]=== process.argv[i]){
        artist +=  process.argv[i]
      }else{
      artist +=  process.argv[i] + symbol;
      }       
    }
    return artist;
}